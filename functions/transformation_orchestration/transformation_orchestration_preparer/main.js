function main(params) {
  const package = "thesis_demo/"
  const fieldsMap = params.data
  const transformations = params.passthrough.compliant

  let actions = []

  Object.keys(transformations).forEach(function(key) {
    transformation_action = package + transformations[key]
    actions = actions.concat({ [transformation_action] : key })
  })

  return Object.assign({}, fieldsMap, { actions: actions })
}

exports.handler = main;
