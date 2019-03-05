// endpoint called when querying the service
// receives a cloudant query and some additional data

// for a given cloudant query, get only the user ids
function main(params) {
  let query = params.data.query
  // query may come in as object or stringified
  if (typeof(query) === 'string')
    query = JSON.parse(params.data.query);

  // clone query because it's being mutated
  const original_query = Object.assign({}, query)

  query.fields = ['user_id']
  return {
    "dbname": "user",
    "query": query,
    "passthrough": {
      "query": original_query,
      "access_purpose": params.data.access_purpose,
      "access_utilizer": params.data.access_utilizer
    }
  }
}

exports.handler = main;
