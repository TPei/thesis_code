function main(params) {
  return {
    "dbname": "yappl",
    "query": {
      "selector": {
        "user_id": { "$in": params.data.ids }
      }
    },
    "passthrough": {
      "access_purpose": params.data.access_purpose,
      "access_utilizer": params.data.access_utilizer,
      "query": params.data.query
    }
  }
}

exports.handler = main;
