const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');


const app = express();
const db = monk('localhost/chatApp');
const data = db.get('data');
filter = new Filter();

app.use(cors());
app.use(express.json());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 175 // limit each IP to 100 requests per windowMs
}));

app.get('/', (req, res) => {
    res.json({
        message: 'Bonjour!'
    });
});

app.get('/chappo', (req, res) => {
    data.find().then(data => {
        res.json(data);
    });
});

function isValidChappo(chappo){
    return chappo.name && chappo.name.toString().trim !== '' &&
    chappo.message && chappo.message.toString().trim !== '';
}

app.post('/chappo', (req, res) => {
    if (isValidChappo(req.body)){
        // insert to db
        const chappo = {
            name: filter.clean(req.body.name.toString()),
            comment: filter.clean(req.body.message.toString()),
            created: new Date()
        };

        console.log(chappo);
        data.insert(chappo).then(createdChappo => {
            res.json(createdChappo);
        });

    } else {
        res.status(422);
        res.json({
            message: "Namul si contente sunt required!"
        });
    }
});

app.listen(8080, () => {
    console.log("Listening on http://localhost:8080");
});