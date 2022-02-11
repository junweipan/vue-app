const getters = {
  sidebar: store => store.app.sidebar,
  device: store => store.app.device,
  token: store => store.user.token,
  avatar: store => store.user.avatar,
  // const { oprId, roleId, oprName, roleInfoList, 
  // roleName, roleType, brhName } = operator
  roles: state => state.user.operator.roleInfoList,
  oprId: state => state.user.operator.oprId,
  oprName: state => state.user.operator.oprName,
  brhName: state => state.user.operator.brhName,
  currentRoleId: state => state.user.operator.roleId,
  currentRoleName: state => state.user.operator.roleName,
  currentRoleType: state => state.user.operator.roleType,
  visitedViews: store => store.tagsView.visitedViews,
  cachedViews: store => store.tagsView.cachedViews,
}
export default getters
