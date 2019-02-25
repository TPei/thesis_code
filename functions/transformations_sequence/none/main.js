// returns data unaltered (echo)

function main(params) {
  let updated_params = params
  let actions = params.actions
  actions.forEach(function(action) {
    let name = Object.keys(action)[0] // there's only one
    let field = action[name]
    if(name === 'none') {
      let res = none(params[field])

      updated_params[field] = res
    }
  })
  return updated_params
}

function none (data) {
  return data
}

exports.handler = main;
