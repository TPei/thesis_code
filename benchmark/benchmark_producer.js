var openwhisk = require('openwhisk')

function main(params) {
  var ow = openwhisk()

  return ow.actions.invoke({
    name: "Bluemix_Event Streams-gn_Service credentials-1/messageHubProduce",
    params: {
      topic: "benchmark",
      value: params.benchmark
    }
  })

  return { message: "pushed message to event stream" }
}

