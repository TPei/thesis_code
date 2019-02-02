var openwhisk = require('openwhisk')

function main(params) {
  var ow = openwhisk()

  ap = params.access_purpose
  au = params.access_utilizer
  policy = params.policy

  // TODO:
  // If you pass in an array for the first parameter, the invoke call will be executed for each array item. The function returns a Promise which resolves with the results when all operations have finished.
  // ow.actions.invoke(["a", {name: "b", blocking: true}])
  var actions = policy.map(function(rule) {
    return ow.actions.invoke({
      "name": "thesis_demo/graph_checker_js",
      "blocking": true,
      "result": true,
      "params": {
        "ap": ap,
        "aip": rule.permitted_purposes,
        "pip": rule.excluded_purposes
      }
    }).then(function(pResult){
      return ow.actions.invoke({
        "name": "thesis_demo/graph_checker_js",
        "blocking": true,
        "result": true,
        "params": {
          "ap": au,
          "aip": rule.permitted_utilizers,
          "pip": rule.excluded_utilizers
        }
      }).then(function(uResult){
        res = {}
        rule.transformations.forEach(function(tr) {
          res[tr.attribute] = tr.tr_func
        })

        return {
          transformations: res,
          purpose: pResult,
          utilizer: uResult
        }
      })
    })
  })

  return Promise.all(actions).then(function (results) {
    nonCompliant = []
    transformations = {}

    results.forEach(function(result) {
      // for util and purpose if one aip_compliant and ALL pip_compliant
      purpose_pip = result.purpose.pip_compliant.every(val => val == true)
      purpose_aip = result.purpose.aip_compliant.some(val => val == true)
      util_pip = result.utilizer.pip_compliant.every(val => val == true)
      util_aip = result.utilizer.aip_compliant.some(val => val == true)

      keys = Object.keys(result.transformations)
      if(purpose_pip && purpose_aip && util_pip && util_aip) {
        keys.forEach(function(key) {
          transformations[key] = result.transformations[key]
        })
      } else {
        nonCompliant = nonCompliant.concat(keys)
      }
    })

    return {
      user_id: params.user_id,
      compliant: transformations,
      nonCompliant: nonCompliant
    }
  });
}
