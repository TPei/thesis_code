function main (params) {
  return { data: params.data.map(ele => finalize(ele)) }
}

function finalize(params) {
  let updated_params = params
  delete updated_params.actions
  return updated_params
}

exports.handler = main
