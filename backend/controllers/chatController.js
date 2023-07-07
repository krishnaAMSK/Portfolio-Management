const Message = require('../models/message');

// Controller function for GET /chat
async function getChatPage(req, res) {
  try {
    // Fetch all inbox messages for the logged-in user
    const inboxMessages = await Message.getInboxMessages(req.user.email);

    // Fetch all outbox messages for the logged-in user
    const outboxMessages = await Message.getOutboxMessages(req.user.email);

    // Render the chat page with inbox and outbox messages
    res.render('chat', { inboxMessages, outboxMessages });
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Controller function for POST /chat
async function sendMessage(req, res) {
  const { recipient, content } = req.body;

  try {
    const message = new Message(req.user.email, recipient, content);
    await message.save();

    // Redirect to the chat page
    res.redirect('/chat');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getChatPage,
  sendMessage
};
