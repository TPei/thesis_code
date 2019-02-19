// This is the comductor action for applying all yappl transformations
// given a transformation plan of format:
// { actions: [ { "function_name": "field_name" }, ... ] }
// it calls all given functions and hands in exactly the requested data field
// as { data: field_value }
// a yappl transformation function should then return { data: modified_field_value }
// the data is then updated eg. { name: "some name", ... } => { name: "***", ... }
// in the original params hash before the next transformation is called
// this continues until all transformation functions have been called
// finally, the modified data is returned
// BEWARE: if a function returns nil for some reason, the data is still updated
// TODO: make sure, that failures in function calls (e.g. function does not exist) do not lead to nullifying data
function main(params) {
  // SETUP
  let step = params.$step || 0
  let actions = params.$actions || params.actions || []
  let old_params = params.$params || params
  let used_param = params.$used_param || ''

  delete params.$step
  delete params.actions
  delete params.$actions
  delete params.$params
  delete params.$used_param

  // MERGE RETURNED DATA
  if(step != 0) {
    // a yappl-compatible transformation function has the following signature
    // transformation: { data: x } -> { data: x' }
    // hence, we hand in eg name as data: name
    // and later merge it back in as name: data
    old_params[used_param] = params['data']

    params = old_params
  }

  // EXIT CONDITION
  if(step >= actions.length) {
    return { params }
  }

  // NEXT STEP
  let action = actions[step]
  // can an action have multiple transformations?
  // otherwise { field1: ac1, f2: ac1, f3: ac2 } is a possible format
  // instead of [{ac1: field1}, {ac1: field2}]
  let action_name = Object.keys(action)[0]
  let action_param = action[action_name]

  // remember signature: transformation: { data: x } -> { data: x' }
  let call_params = {}
  call_params['data'] = params[action_param]

  return {
    action: action_name,
    params: call_params,
    state: {
      $step: step + 1,
      $actions: actions,
      $params: params,
      $used_param: action_param
    }
  }
}

exports.handler = main;
