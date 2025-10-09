const { google } = require('googleapis');
const fs = require('fs');

async function initializeSheet() {
    const secrets = JSON.parse(fs.readFileSync('.secrets.json', 'utf-8'));

    const auth = new google.auth.JWT({
        email: secrets.GOOGLE_CLIENT_EMAIL,
        key: secrets.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const SPREADSHEET_ID = secrets.GOOGLE_SHEET_ID;

    try {
        const spreadsheet = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID
        });

        const liveChat = spreadsheet.data.sheets.find(s => s.properties.title === 'LiveChat');
        
        if (!liveChat) {
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId: SPREADSHEET_ID,
                resource: {
                    requests: [{
                        addSheet: {
                            properties: {
                                title: 'LiveChat'
                            }
                        }
                    }]
                }
            });
            console.log('✅ LiveChat sheet created!');
        }

        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: 'LiveChat!A1:D1',
            valueInputOption: 'RAW',
            resource: {
                values: [['Timestamp', 'Name', 'Message', 'Status']]
            }
        });
        
        console.log('✅ Sheet initialized successfully!');
    } catch (error) {
        console.error('Error initializing sheet:', error.message);
    }
}

initializeSheet();
