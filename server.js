const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
});

app.get('/api/quotes', (req, res, next) => {
    if (!req.query.person) {
        res.send({quotes: quotes});
    } else {
        const quotesByName = quotes.filter((quote) => quote.person === req.query.person);
        if (quotesByName) {
            res.send({quotes: quotesByName});    
        } else {
            res.send([]);
        };        
    };
});

app.post('/api/quotes', (req, res, next) => {
    if (req.query.quote && req.query.person) {
        const newQuote = {
            quote: req.query.quote,
            person: req.query.person
        }
        quotes.push(newQuote);
        res.send({quote: newQuote});
    } else {
        res.status(400).send();
    }
});

