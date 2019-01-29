require __dir__ + '/bundle/bundler/setup.rb'
require 'ruby_yappl'

def main(params)
  { policy: YaPPL::Policy.new(1, []).to_json }
end
