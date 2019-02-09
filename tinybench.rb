require 'benchmark'

puts Benchmark.measure {
  10.times do
    `bx wsk action invoke thesis_demo/api_yappl_parse_maker_fetcher_transformator -r -P functions/request.json`
  end
}
