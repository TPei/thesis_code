const { Client } = require('pg')

function main(params) {

  var client = new Client({
    user: params.user,
    password: params.password,
    database: params.dbname,
    port: params.port,
    host: params.host,
    ssl: true
  });
  client.connect()

  return client.query(params.query).then(res => {
    client.end()
    return { docs: res.rows, passthrough: params.passthrough }
  }).catch(err => {
    client.end()
    return { error: err }
  })
}

exports.main = main;

