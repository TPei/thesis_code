const openwhisk = require('openwhisk')

function main(params) {
  const ow = openwhisk()
  const fields = Object.keys(params.compliant)
  const userId = params.user_id

  return {
    "data": {
      "id": userId,
      "fields": fields
    },
    "passthrough": {
      compliant: params.compliant,
      nonCompliant: params.nonCompliant
    }
  }
}
