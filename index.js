require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3011;
const cors = require('cors');
const tts = require('./tts');
app.use(cors());

app.use(express.json());

app.post('/tts', async (req, res) => {
  const { text, voiceType = 101016 } = req.body;

  if (!text) return res.status(400).json({ error: 'text is required' });

  try {
    const audioData = await tts(text, voiceType);
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioData, 'base64'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`TTS server listening at http://localhost:${port}`);
});