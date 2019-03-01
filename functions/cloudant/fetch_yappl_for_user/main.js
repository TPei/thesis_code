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
          "user_id": { "$in": params.data.ids }
        }
      }
    }
  }).then(function(result) {
    return {
      data: result.docs.map(doc => {
        return {
          policy: doc.policy,
          user_id: doc.user_id,
          access_purpose: params.data.access_purpose,
          access_utilizer: params.data.access_utilizer,
          query: params.data.query
        }
      })
    }
  })
}

exports.handler = main;
