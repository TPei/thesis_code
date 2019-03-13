function main(params) {
  return {
    data: {
      ids: params.docs.map(user => user.user_id),
      query: params.passthrough.query,
      access_purpose: params.passthrough.access_purpose,
      access_utilizer: params.passthrough.access_utilizer
    }
  }
}

exports.handler = main;
