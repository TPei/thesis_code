function main(params) {
  const fieldsMap = params.data
  const transformations = params.passthrough.compliant

  let actions = []

  Object.keys(transformations).forEach(function(key) {
    transformation_action = transformations[key]
    actions = actions.concat({ [transformation_action] : key })
  })

  return Object.assign({}, fieldsMap, { actions: actions })
}

exports.handler = main;
