require 'benchmark'

puts "ruby:"
puts Benchmark.measure {
  10.times do
    `bx wsk action invoke thesis_demo/yappl_parser -P functions/yappl_parser/demo_policy.json -r`
  end
}

puts "javascript:"
puts Benchmark.measure {
  10.times do
    `bx wsk action invoke thesis_demo/yappl_parser_js -P functions/yappl_parser/demo_policy.json -r`
  end
}
