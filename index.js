import express from 'express'
import pg from 'pg'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000
const { Pool } = pg

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

app.get('/', (req, res) => {
    pool.query('SELECT * FROM biodata')
        .then(testData => {
            console.log(testData.rows);

            res.json(testData.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})