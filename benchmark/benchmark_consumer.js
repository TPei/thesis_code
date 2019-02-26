var openwhisk = require('openwhisk')

function main(params) {
  var ow = openwhisk()

  let benchmark_name = params.messages[0].value

  return ow.actions.invoke({
    name: "thesis_demo/api_yappl_parse_maker_fetcher_transformator",
    blocking: true,
    params: {
      data: {
        access_purpose: "General-Purpose.Marketing.Direct.Email.Special-Offer",
        access_utilizer: "General-Utilizer.Non-Profit.University.TU-Berlin",
        query: "{ \"selector\": { \"user_id\": \"1337\" } }"
      }
    }
  }).then(activation => {
    // write to bucket
    let time = new Date().getTime();

    return ow.actions.invoke({
      name: "cloud-object-storage/object-write",
      params: {
        bucket: "benchmark-results-gb",
        key: benchmark_name + ":" + time,
        body: { date: time, benchmark: benchmark_name, duration: activation.duration }
      }
    }).then(() => {
      return {
        benchmark: benchmark_name,
        duration: activation.duration,
        response: activation.response
      }
    }, (error) => {
      return {
        benchmark: benchmark_name,
        duration: activation.duration,
        response: activation.response,
        error: error
      }
    })
  }, (error) => { return error })
}

exports.main = main;
