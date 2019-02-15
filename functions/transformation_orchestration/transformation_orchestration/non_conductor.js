openwhisk = require('openwhisk');

function main(params) {
  ow = openwhisk();
  let actions = params.actions;

  // Object.keys(actions).forEach
  //for (let [action_name, param_name] of Object.entries(actions)) {
  //Object.keys(actions).forEach(function(action_name)}
  let results = actions.map(function(action_hash) {
    let action_name = Object.keys(action_hash)[0]
    let param_name = action_hash[action_name]
    let param = { data: params[param_name] }

    return ow.actions.invoke({
      "name": action_name,
      "blocking": true,
      "result": true,
      "params": param
    }).then(res => { return { [param_name] : res.data } })
  })

  return Promise.all(results).then(function (results) {
    let updated_params = params
    results.forEach(function(result) {
      let field = Object.keys(result)[0]
      let value = result[field]
      updated_params[field] = value
    })
    delete updated_params.actions
    return updated_params
  })
}
