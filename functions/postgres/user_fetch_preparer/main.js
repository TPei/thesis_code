function main(params) {
  return { data: params.data.map(ele => prepare(ele)) }
}

function prepare(params) {
  const userId = params.user_id
  const requested_fields = params.query.split(" FROM")[0].replace("SELECT ", "").split(', ')

  let fields = Object.keys(params.compliant)
  // use only requested fields (if they were passed in...)
  if(!requested_fields.includes('*'))
    fields = fields.filter(el => requested_fields.includes(el))

  return {
    "data": {
      "id": userId,
      "fields": fields
    },
    "passthrough": {
      compliant: params.compliant,
      nonCompliant: params.nonCompliant,
      query: params.query
    }
  }
}

exports.handler = main;
