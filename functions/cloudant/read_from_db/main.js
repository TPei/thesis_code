var openwhisk = require('openwhisk')

function main(params) {
  var ow = openwhisk()

  return ow.actions.invoke({
    "name": "applicationdb/read",
    "blocking": true,
    "result": true,
    "params": {
      "dbname": params.db,
      "id": params.id
    }
  })
}
