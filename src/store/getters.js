const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo: state => state.user.userInfo,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  moduleTwoVisitedViews: state => state.moduleTwoTagsView.visitedViews,
  moduleTwoCachedViews: state => state.moduleTwoTagsView.cachedViews,
}
export default getters
