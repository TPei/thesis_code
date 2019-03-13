function main(params) {
  let query = params.data.query
  const original_query = query

  let keep = query.split('FROM ')[1]
  query = `SELECT user_id FROM ${keep}`

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
