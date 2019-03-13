const _ = require('lodash');

function main(params) {
  // not faster than nested loop, but nicer to read...
  let allRequiredFields = params.data.map(ele => ele.data.fields)
  allRequiredFields = _.flattenDeep(allRequiredFields)
  allRequiredFields = _.uniq(allRequiredFields)

  let query = params.data[0].passthrough.query
  const original_query = query

  let keep = query.split('FROM ')[1]
  query = `SELECT ${allRequiredFields.join(', ')}, user_id FROM \"user\".\"user\" WHERE user_id IN (${params.data.map(ele => `'${ele.data.id}'`).join(', ')})`

  return {
    "dbname": "user",
    "query": query,
    "passthrough": params.data
  }
}

exports.handler = main;
