const initPersons = {
	persons: [],
	rowIndex: 0,
	person: {}
}

const personReducer = (state = initPersons, action) =>{
	switch(action.type){
		case 'ADD':
			state = {
				...state,
				persons: state.persons.concat(action.payload),
				person: action.payload,
				rowIndex: (state.persons.length - 1)
			}
			break;
		case 'EDIT':
			state = {
				...state,
				persons: state.persons.map(item => {
					if(item.id === action.payload.id){
			          	item.lastName = action.payload.lastName;
						item.firstName = action.payload.firstName;
						item.middleName = action.payload.middleName;
						item.city = action.payload.city;
						item.country = action.payload.country;
					}
			        return item
      			})
      		}
      		break;
		case 'DISPLAY':
			state = {
				...state,
				rowIndex: action.rowIndex,
				person: action.payload
			}
			break;
		case 'INITIAL':
			state = {
				...state,
				persons: action.payload,
				person: action.payload[0],
				rowIndex: 0
			}
			break;
		case 'DEFAULT':
			state = {
				...state,
				persons: [],
				rowIndex: 0,
				person: {}
			}
			break;
	}

	return state;
}

export default personReducer;
