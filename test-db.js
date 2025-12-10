const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'n2N]2{e#$=gWY!lU',
  database: 'aniyume'
})

client.connect()
  .then(() => {
    console.log('✅ Connected successfully!')
    return client.query('SELECT version()')
  })
  .then(result => {
    console.log('PostgreSQL version:', result.rows[0].version)
    client.end()
  })
  .catch(err => {
    console.error('❌ Connection error:', err.message)
    console.error('Code:', err.code)
  })
