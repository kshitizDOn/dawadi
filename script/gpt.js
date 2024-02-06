const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "gpt",
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "chatgpt",
    category: "𝗙𝗨𝗡",
    guide: {
      en: "{p}{n} questions",
    },
  },
  makeApiRequest: async function(encodedPrompt, uid, a) {
    try {
      const response = await axios.get(`https://sandipapi.onrender.com/gpt2?prompt=${encodedPrompt}&uid=${uid}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  downloadFile: async function(url, dest) {
    const writer = fs.createWriteStream(dest);

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  },
  run: async function({ message, event, args, api }) {
    try {
      const uid = event.senderID;
      const encodedPrompt = encodeURIComponent(args.join(" "));
      const a = "repl";

      if (!encodedPrompt) {
        return api.sendMessage("Please provide questions", event.threadID);
      }

      if (args[0] === 'draw') {
        const [promptText, model] = args.slice(1).join(' ').split('|').map((text) => text.trim());
        const puti = model || "2";
        const baseURL = `https://sandipapi.onrender.com/sdxl?prompt=${promptText}&model=${puti}`;

        const audioPath = path.resolve(__dirname, 'cache', `${uid}_draw_response.mp3`);

        await module.exports.downloadFile(baseURL, audioPath);

        const att = fs.createReadStream(audioPath);

        api.sendMessage({
          body: `${args.join(" ")}`,
          attachment: att,
        }, event.threadID);

        fs.unlinkSync(audioPath); // Delete the downloaded file after sending
      } else {
        const result = await module.exports.makeApiRequest(encodedPrompt, uid, a);

        api.sendMessage({
          body: `${result}`,
        }, event.threadID);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
};
