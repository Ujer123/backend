// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';

const sendOTP = async (emailOrPhone, otp) => {
    // Use an email service to send OTP via email
    if (emailOrPhone.includes('@')) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailOrPhone,
            subject: 'Password Reset OTP',
            text: `Your OTP is ${otp}`,
        });
    } else {
        // Implement SMS sending logic for phone numbers
        // Use Twilio or any other service
    }
};

module.exports = { sendOTP };
