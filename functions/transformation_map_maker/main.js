var openwhisk = require('openwhisk')

function main(params) {
  var ow = openwhisk()

  ap = params.access_purpose
  au = params.access_utilizer
  policy = params.policy

  // TODO:
  // If you pass in an array for the first parameter, the invoke call will be executed for each array item. The function returns a Promise which resolves with the results when all operations have finished.
  // ow.actions.invoke(["a", {name: "b", blocking: true}])
  var purpose_actions = policy.map(function(rule) {
    return ow.actions.invoke({
      "name": "thesis_demo/graph_checker_js",
      "blocking": true,
      "result": true,
      "params": {
        "ap": ap,
        "aip": rule.permitted_purposes,
        "pip": rule.excluded_purposes
      }
    });
  });

  var utilizer_actions = policy.map(function(rule) {
    return ow.actions.invoke({
      "name": "thesis_demo/graph_checker_js",
      "blocking": true,
      "result": true,
      "params": {
        "ap": au,
        "aip": rule.permitted_utilizers,
        "pip": rule.excluded_utilizers
      }
    });
  });

  return Promise.all(purpose_actions.concat(utilizer_actions)).then(function (results) {
    let purpose_results = results.slice(0, policy.length)
    let utilizer_results = results.slice(policy.length)

    nonCompliant = []
    transformations = {}

    for (let i = 0; i < purpose_results.length; i++) {
      purpose_pip = purpose_results[i].pip_compliant.every(val => val == true)
      purpose_aip = purpose_results[i].aip_compliant.some(val => val == true)
      util_pip = utilizer_results[i].pip_compliant.every(val => val == true)
      util_aip = utilizer_results[i].aip_compliant.some(val => val == true)

      let rule = policy[i];
      if(purpose_pip && purpose_aip && util_pip && util_aip) {
        rule.transformations.forEach(tr => {
          transformations[tr.attribute] = tr.tr_func
        })
      } else {
        nonCompliant = nonCompliant.concat(rule.transformations.map(tr => tr.attribute))
      }
    }
    return {
      user_id: params.user_id,
      compliant: transformations,
      nonCompliant: nonCompliant
    }
  })
}

exports.handler = main;
