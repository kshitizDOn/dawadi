module.exports.config = {
  name: 'help',
  version: '1.1.0', // Update the version number
};

module.exports.run = async function ({ api, event, enableCommands, args }) {
  try {
    const helpMessage = `╔═══════════╗
     𝗞𝘀𝗵𝗶𝘁𝗶𝘇 𝗔𝘂💐
╚═══════════╝\n╭─╮
│『 𝗜𝗡𝗙𝗢 』
│☪︎define  ☪︎history
│☪︎time ☪︎stalk
│☪︎nn ☪︎dictionary
╰───────────ꔪ
╭─╮
│『 𝗔𝗡𝗜𝗠𝗘 』
│ あanistatus あanigif
│ あanipic 
╰─────────ꔪ
╭─╮
│『 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 』
│⊙alldl (soon)
╰─────────ꔪ
╭─╮
│『 𝗧𝗢𝗢𝗟𝗦 』
│☭getlink ☭clean
╰─────────ꔪ
╭─╮
│『 𝗘𝗡𝗧𝗘𝗥𝗧𝗔𝗜𝗡𝗠𝗘𝗡𝗧 』
│♡fun ♡smeme
│♡say ♡sad
│♡lyricalvideo ♡fun2
╰──────────ꔪ

╭─╮
│『 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 』
│※page
│※group
╰────────ꔪ
╭─╮
│『 𝗠𝗨𝗦𝗜𝗖 』
│♪sing ♪lv
╰──────────ꔪ
╭─────────╮
│『  𝗔𝗜 』
│❃gpt
│❃ai
╰─────────╯
╔═══════════╗
        𝗔𝘂𝘁𝗼𝗕𝗼𝘁🤍🪽
╚═══════════╝`;

    api.sendMessage(helpMessage, event.threadID, event.messageID);
  } catch (error) {
    console.log(error);
  }
};
