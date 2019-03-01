function main(params) {
  const userId = params.user_id
  const requested_fields = params.query.fields
  let fields = Object.keys(params.compliant)
  // use only requested fields (if they were passed in...)
  if(requested_fields !== undefined)
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
