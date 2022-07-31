const express = require('express');
const db = require('./db-config');
const {sql} = require('@databases/pg');
const cors = require('cors');

const app = express();

const corsOptions = { origin:'*' };

app.use(cors(corsOptions));

app.get('/', (req, res) =>{
    res.send('This is the home page.');
});

app.get('/data', (req, res) =>{
    const offset = req.query.offset;

    getData(offset).then(item =>{
        res.json(item);
    })
});

async function getData(offset) {
    if(!offset){
        offset = 0;
    }
    const response = await new Promise((resolve, reject) =>{
        try{
            const data = db.query(sql`
            SELECT * FROM lazydata
            ORDER BY id ASC
            LIMIT 10 OFFSET ${offset}
            `);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });

    await db.dispose;

    return response;
}

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
})