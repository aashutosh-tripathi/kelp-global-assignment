const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "aashutosh24",
    database: "public"
})

client.on("connect", () => {
    console.log('Database Connected')
})

client.on("end", () => {
    console.log('DB Connection Ended')
})

module.exports = client;