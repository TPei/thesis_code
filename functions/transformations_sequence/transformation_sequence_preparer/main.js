function main(params) {
  const fieldsMap = params.data
  const transformations = params.passthrough.compliant
  const requested_fields = params.passthrough.query.fields

  let actions = []

  Object.keys(transformations).forEach(function(key) {
    transformation_action = transformations[key]
    if(requested_fields === undefined || requested_fields.includes(key))
      actions = actions.concat({ [transformation_action] : key })
  })

  return Object.assign({}, fieldsMap, { actions: actions })
}

exports.handler = main;
