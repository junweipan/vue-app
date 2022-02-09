const getters = {
  sidebar: store => store.app.sidebar,
  device: store => store.app.device,
  token: store => store.user.token,
  avatar: store => store.user.avatar,
  name: store => store.user.name,
  roles: state => state.user.roles,
  oprName: state => state.user.oprName,
  brhName: state => state.user.brhName,
  currentRoleName: state => state.user.currentRoleName,
  currentRoleType: state => state.user.currentRoleType,
  currentUser: store => store.user.currentUser,
  usersdb: store => store.user.usersdb,
  visitedViews: store => store.tagsView.visitedViews,
  cachedViews: store => store.tagsView.cachedViews,
}
export default getters
