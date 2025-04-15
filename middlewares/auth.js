const fs = require('fs')
const path = require('path')

const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens.json'), 'utf8'))

// 工具函数：检查 IP 或域名是否匹配通配规则
function matchItem(allowedList, value) {
	return allowedList.some(allowed => {
	  if (allowed.endsWith('.*')) {
		const prefix = allowed.replace(/\.\*$/, '')
		return value.startsWith(prefix)
	  }
	  return allowed === value
	})
  }
  
  // 获取客户端 IP（IPv4 映射处理）
  function getClientIP(req) {
	const forwarded = req.headers['x-forwarded-for']
	const ip = forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress
	return ip.replace(/^::ffff:/, '')
  }


  function tokenAuthMiddleware(req, res, next)  {
	
	const token = req.headers['x-access-token']
	
	if (!token || !tokens[token]) {
	  return res.status(401).json({ error: 'Token invalid' })
	}
	
	const allowList = tokens[token]
	const clientIP = getClientIP(req)
	const clientHost = req.hostname
	 
	if (matchItem(allowList, clientIP) || matchItem(allowList, clientHost)) {
	  return next()
	}
	
	return res.status(403).json({ error: 'IP or domain is not authorized.' })
	}

	module.exports = {
		tokenAuthMiddleware,
		matchItem,
		getClientIP
	  }