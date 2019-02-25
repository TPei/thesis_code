require 'benchmark'

puts 'conductor'
puts Benchmark.measure {
  10.times do
    `bx wsk action invoke thesis_demo/api_yappl_parse_maker_fetcher_transformator -r -P functions/request.json`
  end
}

puts 'orchestrator'
puts Benchmark.measure {
  10.times do
    `bx wsk action invoke thesis_demo/api_yappl_parse_maker_fetcher_transformator_orchestrator -r -P functions/request.json`
  end
}

puts 'sequence'
puts Benchmark.measure {
  10.times do
    `bx wsk action invoke thesis_demo/api_yappl_parse_maker_fetcher_transformator_sequence -r -P functions/request.json`
  end
}
