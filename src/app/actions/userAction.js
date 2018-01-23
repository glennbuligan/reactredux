export function loadInitUsersAction(users){
	return{
		type: 'USER_INITIAL',
		payload: users
	}
}
export function loadCurrentUserAction(user){
	return{
		type: 'USER_CURRENT',
		payload: user
	}
}

