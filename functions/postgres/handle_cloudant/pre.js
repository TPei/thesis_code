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
    "query": toSql(query),
    "passthrough": {
      "query": original_query,
      "access_purpose": params.data.access_purpose,
      "access_utilizer": params.data.access_utilizer
    }
  }
}

function toSql(query) {
  let fields = query.fields
  let selector = query.selector

  let queryParts = []

  Object.keys(selector).forEach(field => {
    let value = selector[field];
    queryParts.push(parseQuery(field, value))
  })

  let queryString = `SELECT ${fields.join(', ')} FROM "user"."user" WHERE ${queryParts.join(' AND ')};`
  return queryString
}

// TODO: support and/or queries
function parseQuery(field, value) {
  // two basic cases:
  // key: value
  // key: { operator: value }
  // operators: lt, lte, gt, gte, eq, ne, in, nin
  if(typeof value == 'object') {
    let operator = Object.keys(value)[0]
    value = value[operator]

    let sqlOperator = undefined

    switch(operator) {
      case '$lt':
        sqlOperator = '<'
        break;
      case '$lte':
        sqlOperator = '<='
        break;
      case '$gt':
        sqlOperator = '>'
        break;
      case '$gte':
        sqlOperator = '>='
        break;
      case '$eq':
        sqlOperator = '='
        break;
      case '$in':
        sqlOperator = 'IN'
        break;
      case '$nin':
        sqlOperator = 'NOT IN'
        break;
    }
    return `${field} ${sqlOperator} '${value}'`
  } else {
    return `${field} = '${value}'`
  }
}

//{
   //"selector": {
      //"user_id": {
         //"$in": [
            //"1337",
            //"42"
         //]
      //}
   //},
   //"fields": [
      //"_id",
      //"name",
      //"age",
      //"gender",
      //"race",
      //"comment",
      //"user_id"
   //],
   //"sort": [
      //{
         //"_id": "asc"
      //}
   //]
//}

exports.handler = main;
