const initUsers = {
	users: [],
	user: {}
}

const userReducer = (state = initUsers, action) =>{
	switch(action.type){
		case 'USER_INITIAL':
			state = {
				...state,
				users: action.payload
			}
			break;
		case 'USER_CURRENT':
			state = {
				...state,
				user: action.payload
			}
			break;
	}

	return state;
}

export default userReducer;
