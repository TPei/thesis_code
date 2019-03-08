function main(params) {
  return {
    data: params.docs.map(doc => {
      return {
        policy: doc.policy,
        user_id: doc.user_id,
        access_purpose: params.passthrough.access_purpose,
        access_utilizer: params.passthrough.access_utilizer,
        query: params.passthrough.query
      }
    })
  }
}

exports.handler = main;
