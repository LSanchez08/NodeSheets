const express = require('express');

const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

const app = express();

app.get('/', async (req, res) => {
  const spreadsheetId = '1ODqlYR5M9ASuBu3i2dD54ZXO_tzEdD7CWo9ASQBHrmQ';
  const range = 'Sheet1!A1:B6';
  const auth = new GoogleAuth({
    keyFile: 'credentials.json',
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
  });
  const service = google.sheets({version: 'v4', auth});

  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const numRows = result.data.values ? result.data.values.length : 0;
    console.log(`${numRows} rows retrieved.`);

    res.json(result);
  } catch (err) {
    console.log(err);

    res.json('Error');
  }
});

app.listen(1337, (req, res) => console.log('running on 1337'));
