const getters = {
  sidebar: store => store.app.sidebar,
  device: store => store.app.device,
  token: store => store.user.token,
  avatar: store => store.user.avatar,
  name: store => store.user.name,
  currentUser: store => store.user.currentUser,
  usersdb: store => store.user.usersdb,
  visitedViews: store => store.tagsView.visitedViews,
  cachedViews: store => store.tagsView.cachedViews,
}
export default getters
