require __dir__ + '/bundle/bundler/setup.rb'
require 'graph'
require 'json'

def main(params)
  graph = Graph.from_hash(params['graph'])
  purpose = params['purpose']

  # find all nodes on the way to the root for a given node in the graph
  # assumes transitive reduction has been applied on DAG
  start = graph.get_vertex('P')

  nodes = [start]

  continue = true
  n = 0

  while(continue) do
    nodes |= graph.parents_for(nodes[n].name)
    n += 1
    continue = false if n >= nodes.length
  end

  { nodes: nodes.map(&:name), steps: n }
end
