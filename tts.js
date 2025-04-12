const tencentcloud = require('tencentcloud-sdk-nodejs');
const TtsClient = tencentcloud.tts.v20190823.Client;

const client = new TtsClient({
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY,
  },
  region: process.env.TENCENT_REGION,
  profile: {
    httpProfile: {
      endpoint: 'tts.tencentcloudapi.com',
    },
  },
});

module.exports = async function synthesize(text, voiceType = 101016) {
  const params = {
    Text: text,
    SessionId: `${Date.now()}`,
    ModelType: 1,
    VoiceType: voiceType,
    Codec: 'mp3',
    SampleRate: 16000,
  };

  const response = await client.TextToVoice(params);
  return response.Audio;
};
