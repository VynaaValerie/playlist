const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const app = express();

const badWords = [
    'goblok', 'tolol', 'bangsat', 'anjing', 'asu', 'babi', 'kontol', 'memek', 
    'ngentot', 'jancok', 'bajingan', 'kampret', 'idiot', 'bodoh', 'stupid',
    'fuck', 'shit', 'bitch', 'ass', 'dick', 'pussy', 'damn', 'hell',
    'nigger', 'nigga', 'retard', 'gay', 'lesbian', 'homo'
];

function containsProfanity(text) {
    const lowerText = text.toLowerCase();
    return badWords.some(word => {
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        return regex.test(lowerText);
    });
}

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const secrets = JSON.parse(fs.readFileSync('.secrets.json', 'utf-8'));

const auth = new google.auth.JWT({
    email: secrets.GOOGLE_CLIENT_EMAIL,
    key: secrets.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = secrets.GOOGLE_SHEET_ID;

const chatCache = new Map();
const userLastMessage = new Map();
const MESSAGE_COOLDOWN = 3000;

async function getMessages() {
    if (chatCache.has('messages')) {
        const cached = chatCache.get('messages');
        if (Date.now() - cached.timestamp < 5000) {
            return cached.data;
        }
    }

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'LiveChat!A:D',
        });

        const rows = response.data.values || [];
        const messages = rows.slice(1).map(row => ({
            timestamp: row[0] || '',
            name: row[1] || 'Anonymous',
            message: row[2] || '',
            status: row[3] || 'approved'
        })).filter(msg => msg.status === 'approved');

        chatCache.set('messages', { data: messages, timestamp: Date.now() });
        return messages;
    } catch (error) {
        console.error('Error reading from sheets:', error);
        return [];
    }
}

async function addMessage(name, message) {
    const timestamp = new Date().toISOString();
    const status = 'approved';

    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'LiveChat!A:D',
            valueInputOption: 'RAW',
            resource: {
                values: [[timestamp, name, message, status]]
            }
        });

        chatCache.delete('messages');
        return { success: true };
    } catch (error) {
        console.error('Error writing to sheets:', error);
        return { success: false, error: error.message };
    }
}

function validateMessage(message) {
    const wordCount = message.trim().split(/\s+/).length;
    if (wordCount > 400) {
        return { valid: false, reason: 'Pesan terlalu panjang! Maksimal 400 kata.' };
    }

    if (containsProfanity(message)) {
        return { valid: false, reason: 'Pesan mengandung kata-kata tidak pantas. Mohon gunakan bahasa yang sopan.' };
    }

    const toxicPatterns = [
        /(\d{3,}[-.\s]?\d{3,}[-.\s]?\d{4})/gi,
        /(https?:\/\/[^\s]+)/gi,
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
    ];

    for (const pattern of toxicPatterns) {
        if (pattern.test(message)) {
            return { valid: false, reason: 'Pesan mengandung link, email, atau nomor telepon yang tidak diperbolehkan.' };
        }
    }

    return { valid: true };
}

app.get('/api/chat/messages', async (req, res) => {
    try {
        const messages = await getMessages();
        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/chat/send', async (req, res) => {
    const { name, message } = req.body;

    if (!message || message.trim().length === 0) {
        return res.status(400).json({ success: false, error: 'Pesan tidak boleh kosong.' });
    }

    const userName = (name || 'Anonymous').trim().substring(0, 50);
    const userMessage = message.trim();

    const userId = req.ip;
    const now = Date.now();
    const lastMessageTime = userLastMessage.get(userId);

    if (lastMessageTime && now - lastMessageTime < MESSAGE_COOLDOWN) {
        const waitTime = Math.ceil((MESSAGE_COOLDOWN - (now - lastMessageTime)) / 1000);
        return res.status(429).json({ 
            success: false, 
            error: `Tunggu ${waitTime} detik sebelum mengirim pesan lagi.` 
        });
    }

    const validation = validateMessage(userMessage);
    if (!validation.valid) {
        return res.status(400).json({ success: false, error: validation.reason });
    }

    const result = await addMessage(userName, userMessage);
    
    if (result.success) {
        userLastMessage.set(userId, now);
        res.json({ success: true, message: 'Pesan berhasil dikirim!' });
    } else {
        res.status(500).json({ success: false, error: 'Gagal mengirim pesan. Coba lagi.' });
    }
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`PlaylistKu server running on port ${PORT}`);
});
