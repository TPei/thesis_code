function main(params) {
  return {
    data: params.docs.map(document => {
      // find passthrough data for document
      let user_id = document.user_id
      let data = params.passthrough.find(ele => { return ele.data.id === user_id })

      // only allow data for object that was allowed before
      let documentData = {}
      for (var key in document) {
        if (document.hasOwnProperty(key) && data.data.fields.includes(key)) {
          documentData[key] = document[key];
        }
      }
      return { data: documentData, passthrough: data.passthrough }
    })
  }
}

exports.handler = main;
