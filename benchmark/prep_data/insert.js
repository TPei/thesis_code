var openwhisk = require('openwhisk')

function main(params) {
  var ow = openwhisk()

  let document = params.document
  document.user_id = params.user_id.toString()
  if(document.user_id % 2 == 0)
    document.gender = "female"
  else
    document.gender = "male"

  let yappl = params.yappl
  yappl.user_id = params.user_id.toString()

  return ow.actions.invoke({
    "name": "applicationdb/create-document",
    "params": {
      "dbname": "user",
      "doc": document
    }
  }).then(() => {
    return ow.actions.invoke({
      "name": "applicationdb/create-document",
      "params": {
        "dbname": "yappl",
        "doc": yappl
      }
    })
  })
}

exports.handler = main;
