const express = require('express');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const User = require('../../models/user'); // Path to your user model



const razorpay = new Razorpay({
    key_id: "process.env.RAZORPAY_KEY_ID",
    key_secret: "process.env.RAZORPAY_KEY_SECRET",
});


const subscribe= async (req, res) => {
    const { userId, plan } = req.body; 

    try { 
        
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        
        if (plan === 'free') {
            user.membership.push({
                type: plan,
                dateFrom: new Date(),
                dateTo: null, 
            });

            await user.save();
            return res.status(200).json({ msg: 'Subscribed to free plan' });
        }

        const paymentAmount = plan === 'silver' ? 1000 : plan === 'gold' ? 2000 : 3000; 

        const paymentOrder = await razorpay.orders.create({
            amount: paymentAmount, 
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
            notes: {
                plan: plan,
            },
        });

        res.status(200).json({
            orderId: paymentOrder.id,
            currency: paymentOrder.currency,
            amount: paymentOrder.amount,
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


const verify_payment= async (req, res) => {
    const { userId, plan, paymentDetails } = req.body;

    try {
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        
        const dateFrom = new Date();
        const dateTo = new Date();
        dateTo.setFullYear(dateTo.getFullYear() + 1);

        
        user.membership.push({
            type: plan,
            dateFrom: dateFrom,
            dateTo: dateTo,
        });

        await user.save();
        res.status(200).json({ msg: 'Subscription activated', membership: user.membership });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    subscribe,verify_payment
}
