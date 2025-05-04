const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }
    
    const contact = new Contact({
      name,
      email,
      phone,
      message
    });
    
    await contact.save();
    res.status(201).json({ message: 'Contact message sent successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all contact messages (admin only)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};