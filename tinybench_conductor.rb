require 'benchmark'

puts "manual calls:"
puts Benchmark.measure {
  100.times do
    `bx wsk action invoke transformation_test/transformation_orchestration_two -r -P functions/transformation_orchestration/transformation_orchestration/request.json`
  end
}

puts "conductor:"
puts Benchmark.measure {
  100.times do
    `bx wsk action invoke transformation_test/transformation_orchestration -r -P functions/transformation_orchestration/transformation_orchestration/request.json`
  end
}
