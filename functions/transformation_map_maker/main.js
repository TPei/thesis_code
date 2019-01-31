var openwhisk = require('openwhisk')

function main(params) {
  var ow = openwhisk()

  ap = params.access_purpose
  au = params.access_utilizer
  policy = params.policy

  // TODO: handle promises https://lornajane.net/posts/2017/one-openwhisk-action-calls-another
  var actions = policy.map(function(rule) {
    return ow.actions.invoke({
      "name": "thesis_demo/graph_checker",
      "blocking": true,
      "result": true,
      "params": {
        "ap": ap,
        "aip": rule.permitted_purposes,
        "pip": rule.excluded_purposes
      }
    }).then(function(pResult){
      return ow.actions.invoke({
        "name": "thesis_demo/graph_checker",
        "blocking": true,
        "result": true,
        "params": {
          "ap": au,
          "aip": rule.permitted_utilizers,
          "pip": rule.excluded_utilizers
        }
      }).then(function(uResult){
        return {
          field: rule.transformations[0].attribute,
          purpose: pResult,
          utilizer: uResult
        }
      })
    })
  })

  return Promise.all(actions).then(function (results) {
    return {
      response: results.map(function(result) {
        // for util and purpose if one aip_compliant and ALL pip_compliant
        purpose_pip = result.purpose.pip_compliant.every(val => val == true)
        purpose_aip = result.purpose.aip_compliant.some(val => val == true)
        util_pip = result.utilizer.pip_compliant.every(val => val == true)
        util_aip = result.utilizer.aip_compliant.some(val => val == true)
        return {
          field: result.field,
          compliant: purpose_pip && purpose_aip && util_pip && util_aip
        }
      })
    }
  });
}
