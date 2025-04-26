require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3011;
const cors = require('cors');
const tts = require('./tts');
const fs = require('fs')
const path = require('path')
const { tokenAuthMiddleware } = require('./middlewares/auth')
// 加载 Token 白名单配置






app.use(cors({
	origin: '*', // 或指定前端地址，如 'http://localhost:5173'
	allowedHeaders: ['Content-Type', 'x-access-token','x-forwarded-for']
  }));

app.use(express.json());

  // 中间件：token + 白名单校验
  app.use(tokenAuthMiddleware)

app.post('/tts', async (req, res) => {

  const { text, voiceType = 101016  } = req.body;

  if (!text) return res.status(400).json({ error: 'text is required' });

  try {
    const audioData = await tts(text, voiceType);
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioData, 'base64'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/tts/ping', (req, res) => {
	res.json({
	  status: 'ok',
	  message: 'TTS server is running.',
	  timestamp: new Date().toISOString()
	});
  });

app.listen(port, () => {
  console.log(`TTS server listening at http://localhost:${port}`);
});