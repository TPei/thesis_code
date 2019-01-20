// endpoint called when querying for one user
function main (params) {
  // TODO: prepare stuff to return data from one specific user
  // - get all user yappl policies
  // - parse yappl (?)
  // - get users' data
  // - apply yappl transformations
  var userId = params.data.id
  return { data: userId }
}
