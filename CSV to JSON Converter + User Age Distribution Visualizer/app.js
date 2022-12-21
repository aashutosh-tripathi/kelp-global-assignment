const client = require('./database')

async function init() {
    await client.connect();
}

async function disconnect() {
    await client.end();
}

function showData() {
    const query = "SELECT CASE WHEN age BETWEEN 0 AND 19 THEN '<20' WHEN age BETWEEN 20 AND 40 THEN '20 to 40' WHEN age BETWEEN 41 AND 60 THEN '40 to 60' ELSE '>60' END AS Age_Group, COUNT(*)*100/(SELECT COUNT(*) FROM users) AS Percentage_Distribution FROM users GROUP BY Age_Group";
    client.query(query, (err, res) => {
        if (!err) {
            console.log('Table: Showing percentage distribution of users over different age groups')
            console.table(res.rows);
            disconnect();
        }
    })
}

async function insertRow(fullName, age, address, additional_info) {

    try {
        const query = 'insert into users(name, age, address, additional_info) VALUES ($1, $2, $3, $4)'
        const values = [fullName, age, address, additional_info]

        await client.query(query, values, (err, res) => {
            if (!err) {
                console.log('Record Saved')
            }
        })
    } catch (err) {
        console.error(err)
    } finally {
    }
}



module.exports = { insertRow, init, disconnect, showData };