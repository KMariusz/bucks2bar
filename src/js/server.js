const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Add this line
app.use(bodyParser.json({ limit: '10mb' }));

// Serve static files (for development)
app.use(express.static('src'));

// Email sending endpoint
app.post('/send-chart-email', async (req, res) => {
    const { email, image } = req.body;
    if (!email || !image) {
        return res.status(400).send('Missing email or image');
    }
    console.log(`Sending chart to ${email}`);


    // // Remove data URL prefix
    // const base64Data = image.replace(/^data:image\/png;base64,/, '');

    // // Configure nodemailer (use your SMTP credentials)
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail', // or your email provider
    //     auth: {
    //         user: 'your.email@gmail.com',
    //         pass: 'your_app_password'
    //     }
    // });

    // try {
    //     await transporter.sendMail({
    //         from: '"Bucks2Bar" <your.email@gmail.com>',
    //         to: email,
    //         subject: 'Your Bucks2Bar Chart',
    //         text: 'Attached is your chart from Bucks2Bar.',
    //         attachments: [
    //             {
    //                 filename: 'chart.png',
    //                 content: Buffer.from(base64Data, 'base64'),
    //                 contentType: 'image/png'
    //             }
    //         ]
    //     });
    //     res.sendStatus(200);
    // } catch (err) {
    //     res.status(500).send('Failed to send email');
    // }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});