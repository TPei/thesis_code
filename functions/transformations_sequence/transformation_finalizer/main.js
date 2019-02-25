function main (params) {
  let updated_params = params
  delete updated_params.actions
  return updated_params
}

exports.handler = main
