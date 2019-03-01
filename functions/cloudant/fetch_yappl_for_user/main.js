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
          "user_id": params.data.id.toString()
        }
      }
    }
  }).then(function(result) {
    return {
      policy: result.docs[0].policy,
      user_id: result.docs[0].user_id,
      access_purpose: params.data.access_purpose,
      access_utilizer: params.data.access_utilizer,
      query: params.data.query
    }
  })
}

exports.handler = main;
