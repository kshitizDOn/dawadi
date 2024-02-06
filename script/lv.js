const fs = require('fs');
const axios = require('axios');

module.exports.config = {
  name: 'lv',
  version: '1.0',
  author: 'Kshitiz',
  countDown: 5,
  role: 0,
  shortDescription: 'lyrical video',
  longDescription: '',
  category: 'media',
  guide: {
    en: '{p}{n}',
  },
};

module.exports.run = async function ({ api, event }) {
  try {
    api.setMessageReaction('🕐', event.messageID, (err) => {}, true);

    const apiUrl = 'https://lyricsvideo.onrender.com/kshitiz';
    const response = await axios.get(apiUrl);

    if (response.data.url) {
      const tikTokUrl = response.data.url;
      console.log(`TikTok Video URL: ${tikTokUrl}`);

      const turtleApiUrl = `https://kshitiz-tikdl.onrender.com/tiktok?url=${encodeURIComponent(tikTokUrl)}`;
      const turtleResponse = await axios.get(turtleApiUrl);

      if (turtleResponse.data.videoUrl) {
        const videoUrl = turtleResponse.data.videoUrl;
        console.log(`Downloadable Video URL: ${videoUrl}`);

        const cacheFilePath = __dirname + `/cache/tiktok_${Date.now()}.mp4`;
        await module.exports.downloadVideo(videoUrl, cacheFilePath);

        if (fs.existsSync(cacheFilePath)) {
          await api.sendMessage({
            body: 'Random lyrical video.',
            attachment: fs.createReadStream(cacheFilePath),
          }, event.threadID, event.messageID);

          fs.unlinkSync(cacheFilePath);
        } else {
          api.sendMessage('Error downloading the video.', event.threadID);
        }
      } else {
        api.sendMessage('Error fetching video URL.', event.threadID);
      }
    } else {
      api.sendMessage('Error fetching data from external API.', event.threadID);
    }

    await api.unsendMessage(loadingMessage.messageID, event.threadID);
  } catch (err) {
    console.error(err);
    api.sendMessage('An error occurred while processing the lv command.', event.threadID);
  }
};

module.exports.downloadVideo = async function (url, cacheFilePath) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'arraybuffer',
    });

    fs.writeFileSync(cacheFilePath, Buffer.from(response.data, 'binary'));
  } catch (err) {
    console.error(err);
  }
};
