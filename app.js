const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const { URL } = require('./models');

const app = express();

const port =  process.env.port || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

async function connectDB() {
    try {
      await mongoose.connect('mongodb://localhost:27017/urlShortener');
      console.log("MongoDB connection Succesful.");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }


connectDB();

app.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;

    const isExist = await URL.findOne({ longUrl });
    
    if(isExist) {
        //console.log("exist!");
        return res.json(isExist);
    }
        // short url
        const shortUrl = Math.random().toString(36).substring(2, 8);
        // save to database
        try {
            const url = new URL({ longUrl, shortUrl});
            await url.save();
            res.json(url);
        } catch (error) {
            res.status(500).json({ error: 'There was an error saving to database.' });
            console.log(error)
        }
    
    
});

app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params
    try {
        const url = await URL.findOne({ shortUrl });
        if(url) {
            //for url datas
            url.clicks += 1;
            await url.save();
            res.redirect(url.longUrl)
        } else {
            res.status(404).json({ error: 'URL not found in database.' });
        }      
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database Error.' });
    }

});

app.listen(port, () => {
    console.log(`Server is runing at http://localhost:${port}`);
});
