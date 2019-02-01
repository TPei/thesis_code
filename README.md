# PBAC in FaaS Environments

This is the code for my masters' thesis on "Purpose-based Access Control
in Function as a Service Environments"

## System Trace
The following functions are currently being called in sequence:
- get_user
- fetch_yappl_for_user
  - applicationdb/exec-query-find
- yappl_parser
- transformation_map_maker
  - calls thesis_demo/graph_checker 2xN times
- get user_data
  - only compliant fields

Next up:
- transformation_orchestration
  - different transformation functions
- done(?)

Also: Use params.passthrough as passthrough instead of explicitly naming
all variables that are passed through

## Ideas:
Are graph_checker calls properly parallelized?
graph_checker is called for every user rule twice: once for checking the
access purpose and once for checking the access utilizer against the
user preferences.
Uses promises that resolve in the end, but blocking ow action invocation
calls...
