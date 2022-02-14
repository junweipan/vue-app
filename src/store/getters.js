const getters = {
  sidebar: store => store.app.sidebar,
  device: store => store.app.device,
  token: store => store.user.token,
  avatar: store => store.user.avatar,
  // operator: { oprId, roleId, oprName, roleInfoList, 
  // roleName, roleType, brhName }
  roles: state => state.user.operator.roleInfoList,
  operator: state => state.user.operator,
  currentRoleID: state => state.user.currentRoleID,
  visitedViews: store => store.tagsView.visitedViews,
  cachedViews: store => store.tagsView.cachedViews,
}
export default getters
