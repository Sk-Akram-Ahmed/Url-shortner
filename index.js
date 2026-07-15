require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Url = require('./models/urls');
const { generateShortCode } = require('./utils/logic');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('database connected');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('form.ejs');
});

app.post('/shorten', async (req, res) => {
  const originalUrl = req.body.url;

  if (!originalUrl) {
    return res.status(400).send('Please enter a URL');
  }

  try {
    let existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      return res.render('result.ejs', {
        shortUrl: `http://localhost:3000/${existingUrl.shortCode}`
      });
    }

    const shortCode = generateShortCode();
    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save();

    res.render('result.ejs', {
      shortUrl: `http://localhost:3000/${shortCode}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortCode });

    if (!urlEntry) {
      return res.status(404).send('Short URL not found');
    }

    res.redirect(urlEntry.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});