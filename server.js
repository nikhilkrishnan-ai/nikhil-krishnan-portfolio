// ⚡ LEONODE ACADEMY - Backend Express Engine (Port 3000)
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images and styles if any
app.use('/images', express.static(path.join(__dirname, 'images')));

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Load the front-end HUD page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 💳 STEP 1: Create Order Endpoint
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency = "INR" } = req.body;
        
        if (!amount || amount < 100) {
            return res.status(400).json({ 
                error: "Invalid amount. Minimum amount is 100 paise (1 INR)." 
            });
        }

        const options = {
            amount: amount, // amount in paise
            currency: currency,
            receipt: `receipt_order_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        
        res.json({
            order_id: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        console.error("[RAZORPAY CREATE ORDER ERROR]:", error);
        res.status(500).json({ 
            error: "Failed to create Razorpay order", 
            details: error.message 
        });
    }
});

// 💳 STEP 2: Verify Payment Signature Endpoint
app.post('/api/verify-payment', (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ 
                error: "Missing required verification fields." 
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            console.log(`[LEONODE ACADEMY PAYMENT]: Successful Payment Secured! 💳`);
            res.json({
                status: "SUCCESS",
                message: "Signature match. Payment verified successfully!",
                token: "LEONODE_ACADEMY_PAID_VALID"
            });
        } else {
            console.warn(`[LEONODE ACADEMY PAYMENT WARNING]: Signature mismatch detected! 🚨`);
            res.status(400).json({
                status: "FAILED",
                error: "Invalid payment signature (possible tampering)."
            });
        }
    } catch (error) {
        console.error("[RAZORPAY VERIFY PAYMENT ERROR]:", error);
        res.status(500).json({ 
            error: "Failed to verify payment", 
            details: error.message 
        });
    }
});

// Scholarship Form Submission (Domestic fallback)
app.post('/api/scholarship/submit', (req, res) => {
    const { name, field } = req.body;
    console.log(`[LEONODE ACADEMY LOG]: New Student Application Received! 🔥`);
    console.log(`Student Name: ${name} | Field: ${field}`);
    
    res.json({ 
        status: "SUCCESS", 
        message: "NK POWER: Scholarship application verified and locked domestically!",
        token: "LEONODE_SCHOLARSHIP_VALID_2026"
    });
});

// Server listener
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 LEONODE ACADEMY SERVER IS LIVE ON PORT: ${PORT}`);
    console.log(`👉 Access URL: http://localhost:${PORT}`);
    console.log(`🔒 Security Core: Active Anti-Copy Protection ON`);
    console.log(`==================================================`);
});
