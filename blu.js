const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'blu',
  description: 'Interact with Blu AI',
  usage: 'blu [your message]',
  author: 'Blu',

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ').toLowerCase();

    if (!prompt) return sendMessage(senderId, { text: "Usage: blu <question>" }, pageAccessToken);

    try {
      const { data: { result } } = await axios.get(`https://joshweb.click/api/gpt-4o?q=${encodeURIComponent(prompt)}&uid=${senderId}`);
      sendMessage(senderId, { text: result }, pageAccessToken);
    } catch (error) {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};

