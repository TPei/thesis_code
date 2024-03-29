// returns only provider and tld from an email address
// { data: 'some1234mail@gmail.com' } -> { data: '@gmail.com' }
function main(params) {
  return { data: params.data.map(ele => filter(ele)) }
}

function filter(params) {
  let updated_params = params
  let actions = params.actions
  actions.forEach(function(action) {
    let name = Object.keys(action)[0] // there's only one
    let field = action[name]
    if(name === 'only_provider' && params[field] !== undefined) {
      let res = only_provider(params[field])

      updated_params[field] = res
    }
  })
  return updated_params
}

function only_provider (data) {
  let anonymized = data.split("@")[1]

  return anonymized
}

exports.handler = main;
