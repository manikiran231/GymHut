const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

console.log("✅ Loaded MONGODB_URI:", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined. Check your .env file.");
    process.exit(1);
}

app.use(express.json());

// ✅ Corrected CORS setup (includes production + local origins)
app.use(cors({
    origin: ['http://localhost:5173', 'https://gymhut.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

let db;

async function connectDB() {
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db();
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    }
}

app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

// Registration Route
app.post("/register", async (req, res) => {
    try {
        const { name, email, phone, age, timePreference, username, password } = req.body;

        if (!name || !email || !password || !phone || !age || !timePreference || !username) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const usersCollection = db.collection("users");
        const existingEmailUser = await usersCollection.findOne({ email });
        const existingUsernameUser = await usersCollection.findOne({ username });

        if (existingEmailUser || existingUsernameUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await usersCollection.insertOne({
            name,
            email,
            phone,
            age,
            timePreference,
            username,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
    } catch (err) {
        console.error("❌ Error during registration:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name } });
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Forgot Password Route
app.post('/api/auth/forgot-password', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await db.collection('users').findOne({ username });
        if (!user) return res.status(400).json({ error: 'Username not found' });

        const passcode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await db.collection('users').updateOne(
            { username },
            { $set: { resetPasscode: passcode, otpExpiry: expiry } }
        );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Code',
            text: `Your password reset code is: ${passcode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to send email' });
            }
            res.json({ message: 'Passcode sent to your email' });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Reset Password Route
app.post('/api/auth/reset-password', async (req, res) => {
    const { username, passcode, newPassword } = req.body;

    try {
        const user = await db.collection('users').findOne({ username, resetPasscode: passcode });

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or passcode' });
        }

        if (user.otpExpiry && new Date(user.otpExpiry) < new Date()) {
            return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.collection('users').updateOne(
            { username },
            {
                $set: { password: hashedPassword },
                $unset: { resetPasscode: "", otpExpiry: "" }
            }
        );

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ Start server after DB connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}).catch(err => console.error("❌ Failed to start server:", err));
