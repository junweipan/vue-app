const getters = {
  sidebar: store => store.app.sidebar,
  device: store => store.app.device,
  token: store => store.user.token,
  avatar: store => store.user.avatar,
  name: store => store.user.name,
  userInfo: store => store.user.userInfo,
  visitedViews: store => store.tagsView.visitedViews,
  cachedViews: store => store.tagsView.cachedViews,
  moduleTwoVisitedViews: store => store.moduleTwoTagsView.visitedViews,
  moduleTwoCachedViews: store => store.moduleTwoTagsView.cachedViews,
}
export default getters
