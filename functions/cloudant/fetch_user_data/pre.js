const openwhisk = require('openwhisk')
const _ = require('lodash');

function main(params) {
  const ow = openwhisk()

  // not faster than nested loop, but nicer to read...
  let allRequiredFields = params.data.map(ele => ele.data.fields)
  allRequiredFields = _.flattenDeep(allRequiredFields)
  allRequiredFields = _.uniq(allRequiredFields)

  return {
    "dbname": "user",
    "query": {
      "selector": {
        "user_id": { "$in" : params.data.map(ele => ele.data.id) }
      },
      "fields": allRequiredFields.concat("user_id"), // for mapping
    },
    "passthrough": params.data
  }
}

exports.handler = main;
