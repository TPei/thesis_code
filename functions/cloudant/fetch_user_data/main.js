const openwhisk = require('openwhisk')
const _ = require('lodash');

function main(params) {
  const ow = openwhisk()

  // not faster than nested loop, but nicer to read...
  let allRequiredFields = params.data.map(ele => ele.data.fields)
  allRequiredFields = _.flattenDeep(allRequiredFields)
  allRequiredFields = _.uniq(allRequiredFields)

  return ow.actions.invoke({
    "name": "applicationdb/exec-query-find",
    "blocking": true,
    "result": true,
    "params": {
      "dbname": "user",
      "query": {
        "selector": {
          "user_id": { "$in" : params.data.map(ele => ele.data.id) }
        },
        "fields": allRequiredFields.concat("user_id") // for mapping
      }
    }
  }).then(function(res) {
    return {
      data: res.docs.map(document => {
        // find passthrough data for document
        let user_id = document.user_id
        let data = params.data.find(ele => { return ele.data.id === user_id })

        // only allow data for object that was allowed before
        let documentData = {}
        for (var key in document) {
          if (document.hasOwnProperty(key) && data.data.fields.includes(key)) {
            documentData[key] = document[key];
          }
        }
        return { data: documentData, passthrough: data.passthrough }
      })
    }
  })
}

exports.handler = main;
