const {sql} = require('@databases/pg');
const db = require('./db-config');
const axios = require('axios');

async function createTable() {
    await db.query(sql`
    CREATE TABLE IF NOT EXISTS lazydata (
        id SERIAL NOT NULL PRIMARY KEY,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        thumbnailUrl TEXT NOT NULL
    )
    `);
}

async function addData(title, url, thumbnailUrl) {
    await db.query(sql`
    INSERT INTO lazydata (title, url, thumbnailUrl)
    VALUES (${title}, ${url}, ${thumbnailUrl})
    `);
}

async function populateTable() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos?albumId=1&albumId=2');
    const data = response.data;

    data.forEach(item => {
        addData(item.title, item.url, item.thumbnailUrl);
    });
}

async function run() {
    await createTable();
    await populateTable();
    await db.dispose();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
})