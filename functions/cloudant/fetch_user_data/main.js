const openwhisk = require('openwhisk')

function main(params) {
  const ow = openwhisk()
  const fields = params.data.fields

  return ow.actions.invoke({
    "name": "applicationdb/exec-query-find",
    "blocking": true,
    "result": true,
    "params": {
      "dbname": "user",
      "query": {
        "selector": {
          "user_id": params.data.id.toString()
        },
        "fields": fields
      }
    }
  }).then(res => res.docs[0])
}
