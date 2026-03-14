const fs = require('fs')
const path = require('path')

const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens.json'), 'utf8'))

function escapeRegex(value) {
	return value.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
}

function patternToRegex(pattern) {
	const source = `^${pattern.split('*').map(escapeRegex).join('.*')}$`
	return new RegExp(source, 'i')
}

// Check whether an IP or host matches an allowlist rule, including wildcard rules.
function matchItem(allowedList, value) {
	if (!value) {
		return false
	}

	return allowedList.some(allowed => patternToRegex(allowed).test(value))
}

function getClientIP(req) {
	const forwarded = req.headers['x-forwarded-for']
	const ip = forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress
	return ip.replace(/^::ffff:/, '')
}

function getClientHost(req) {
	const forwardedHost = req.headers['x-forwarded-host']
	const hostHeader = forwardedHost || req.headers.host || req.hostname || ''
	return hostHeader.split(',')[0].trim().replace(/:\d+$/, '').toLowerCase()
}

function tokenAuthMiddleware(req, res, next) {
	const token = req.headers['x-access-token']

	if (!token || !tokens[token]) {
		return res.status(401).json({ error: 'Token invalid' })
	}

	const allowList = tokens[token]
	const clientIP = getClientIP(req)
	const clientHost = getClientHost(req)
	const isAuthorized = matchItem(allowList, clientIP) || matchItem(allowList, clientHost)

	console.log('[auth]', {
		clientIP,
		clientHost,
		isAuthorized
	})

	if (isAuthorized) {
		return next()
	}

	return res.status(403).json({ error: 'IP or domain is not authorized.' })
}

module.exports = {
	tokenAuthMiddleware,
	matchItem,
	getClientIP,
	getClientHost
}
