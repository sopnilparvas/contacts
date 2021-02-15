const router = require("express").Router();
const Contact = require("../models/ContactModel");
const auth = require("../middleware/authMiddleware");

// @route   GET /api/contacts
// @desc    Get users
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort("-createdAt");
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// @route   POST /api/contacts
// @desc    Create user
// @access  Private
router.post("/", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      type,
      user: req.user.id,
    });

    res.json(newContact);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// @route   PUT /api/contacts
// @desc    Update user
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: "Not authorized." });

    const updateContact = await Contact.findByIdAndUpdate(contact._id, req.body, { new: true, runValidators: true });
    res.json(updateContact);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// @route   DELETE /api/contacts
// @desc    DELETE user
// @access  Public
router.delete("/:id", auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: "Not authorized." });

    await Contact.findByIdAndRemove(contact._id);
    res.json({ msg: "Deleted." });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
