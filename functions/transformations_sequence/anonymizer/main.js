// makes a *** string of the same length as input
function main (params) {
  return { data: params.data.map(ele => filter(ele)) }
}

function filter(params) {
  let updated_params = params
  let actions = params.actions
  actions.forEach(function(action) {
    let name = Object.keys(action)[0] // there's only one
    let field = action[name]
    if(name === 'anonymizer' && params[field] !== undefined) {
      let res = anonymize(params[field])

      updated_params[field] = res
    }
  })
  return updated_params
}

function anonymize(data) {
  let anonymized = "*".repeat(data.length)
  return anonymized
}

exports.handler = main;
