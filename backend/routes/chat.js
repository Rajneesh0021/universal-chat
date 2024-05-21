// backend/routes/chat.js
const express = require('express');
const Message = require('../models/Message');
const router = express.Router();


router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().populate('user', 'username').sort({ createdAt: 1 });
    const formattedMessages = messages.map(message => ({
      text: message.text,
      _id: message._id,
      username: message.user.username,
    }));
    res.json(formattedMessages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const newMessage = new Message({ text: req.body.text, user: req.userId });
    await newMessage.save();
    
  res.json([newMessage]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post message' });
  }
});

module.exports = router;
