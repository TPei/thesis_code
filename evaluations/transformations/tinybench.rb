require 'benchmark'

puts "sequence:"
puts Benchmark.measure {
  100.times do
    `bx wsk action invoke transformation_test/transformation_sequence -r -P evaluations/transformations/request.json`
  end
}

puts "conductor:"
puts Benchmark.measure {
  100.times do
    `bx wsk action invoke thesis_demo/transformation_conductor_test -r -P evaluations/transformations/request.json`
  end
}
puts "orchestrator:"
puts Benchmark.measure {
  100.times do
    `bx wsk action invoke thesis_demo/transformation_orchestrator_test -r -P evaluations/transformations/request.json`
  end
}
