const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");

// 1. Create Invoice
router.post("/create", async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. Get All Invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;