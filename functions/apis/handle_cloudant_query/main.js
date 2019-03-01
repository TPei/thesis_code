// endpoint called when querying the service
// receives a cloudant query and some additional data
var openwhisk = require('openwhisk')

// for a given cloudant query, get only the user ids
function main(params) {
  var ow = openwhisk()
  let query = params.data.query
  // query may come in as object or stringified
  if (typeof(query) === 'string')
    query = JSON.parse(params.data.query);

  // clone query because it's being mutated
  const original_query = Object.assign({}, query)

  query.fields = ['user_id']

  return ow.actions.invoke({
    "name": "applicationdb/exec-query-find",
    "blocking": true,
    "result": true,
    "params": {
      "dbname": "user",
      "query": query
    }
  }).then(function(result) {
    return {
      // currently only first user
      id: result.docs.map(user => user.user_id)[0],
      query: original_query,
      access_purpose: params.data.access_purpose,
      access_utilizer: params.data.access_utilizer
    }
  })
}

exports.handler = main;
