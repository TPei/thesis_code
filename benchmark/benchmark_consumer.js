const openwhisk = require('openwhisk')
const performance = require('perf_hooks').performance;

function main(params) {
  let ow = openwhisk()

  let benchmark_name = params.messages[0].value
  let t0 = performance.now();

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
    let t1 = performance.now();
    // write to bucket
    let time = new Date().getTime();

    return ow.actions.invoke({
      name: "cloud-object-storage/object-write",
      params: {
        bucket: "benchmark-results-gb",
        key: benchmark_name + ":" + time,
        body: { date: time, benchmark: benchmark_name, duration: activation.duration, executionTime: t1 - t0 }
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
