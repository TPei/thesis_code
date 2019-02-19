// endpoint called when querying for one user
function main (params) {
  // TODO: prepare stuff to return data from one specific user
  // - get all user yappl policies
  // - parse yappl (?)
  // - get users' data
  // - apply yappl transformations
  var userId = params.data.id
  return {
    data: {
      id: userId,
      access_purpose: params.data['access_purpose'],
      access_utilizer: params.data['access_utilizer']
    }
  }
}

exports.handler = main;
