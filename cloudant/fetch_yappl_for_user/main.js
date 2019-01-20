var openwhisk = require('openwhisk')

function main(params) {
  var ow = openwhisk()

  return ow.actions.invoke({
    "name": "applicationdb/exec-query-find",
    "blocking": true,
    "result": true,
    "params": {
      "dbname": "yappl",
      "query": {
        "selector": {
          "user_id": params.id.toString()
        }
      }
    }
  })
}
