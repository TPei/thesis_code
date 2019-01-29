var openwhisk = require('openwhisk')

function main(params) {
  var ow = openwhisk()

  return ow.actions.invoke({
    "name": "applicationdb/exec-query-find",
    "blocking": true,
    "result": true,
    "params": {
      "dbname": "graphs",
      "query": {
        "selector": {
          "name": params.name
        }
      }
    }
  })
}
