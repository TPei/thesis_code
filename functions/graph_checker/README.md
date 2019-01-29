# Check a Graph

Given a DAG (as in `purpose_graph.json`), the graph checker can
determine if a given node is allowed or node (based on Byun's AIP,
PIP, IP, IP* and AP definitions, transposed to DAGs).

Given:
(- graph definition)
- AP: an access purpose
- AIP: a set of allowed purposes
- PIP: a set of disallowed purposes

Contrary to the definition of AP, AIP and PIP in PBAC trees, for an
arbitrary DAG, we need context / path sensitivity. Because multiple
nodes can have the same children, it would not be clear which path is
meant if we only know a node.

Instead of something like "Phone", we expect something like
"*.Direct.*.Service-Updates" to know which "Service-Updates" are
allowed, namely direct email and telephone, but not third party email
or telephone (see Byun PBAC in case of confusion).

## How to use
Deploy via `wskdeploy`

Then, call it via `wsk action invoke graph/graph_checker -P request.json -r`

