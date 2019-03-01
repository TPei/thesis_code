var openwhisk = require('openwhisk')

function main(params) {
  var ow = openwhisk()

  ap = params.access_purpose
  au = params.access_utilizer
  policy = params.policy

  // TODO:
  // If you pass in an array for the first parameter, the invoke call will be executed for each array item. The function returns a Promise which resolves with the results when all operations have finished.
  // ow.actions.invoke(["a", {name: "b", blocking: true}])
  var purpose_results = policy.map(function(rule) {
    return checkGraph({
      "ap": ap,
      "aip": rule.permitted_purposes,
      "pip": rule.excluded_purposes
    })
  });

  var utilizer_results = policy.map(function(rule) {
    return checkGraph({
      "ap": au,
      "aip": rule.permitted_utilizers,
      "pip": rule.excluded_utilizers
    })
  });

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
    nonCompliant: nonCompliant,
    query: params.query
  }
}

function checkGraph(params) {
  ap = params.ap
  aip_matches = params.aip.map(purpose => makeRegexpString(purpose).test(ap))
  pip_unmatches = params.pip.map(purpose => !makeRegexpString(purpose).test(ap))

  return { aip_compliant: aip_matches, pip_compliant: pip_unmatches }
}

function makeRegexpString(purpose) {
  let str = "^"
  purpose.split(".").forEach(function(element) {
    if(element == "*")
      str += "\\S*"
    else
      str += element

    str += "[.]"
  })

  // remove last [.]
  return new RegExp(str.slice(0, -3) + "$")
}

exports.handler = main;
