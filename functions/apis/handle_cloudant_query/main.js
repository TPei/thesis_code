// endpoint called when querying the service
// receives a cloudant query and some additional data
function main (params) {
  // TODO: handle cloudant query
  const query = JSON.parse(params.data.query);

  return {
    data: {
      //query: query,
      id: query.selector.user_id,
      access_purpose: params.data.access_purpose,
      access_utilizer: params.data.access_utilizer
    }
  }
}

exports.handler = main;
