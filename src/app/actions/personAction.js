export function loadInitPersons(person){
	return{
		type: 'INITIAL',
		payload: person
	}
}
export function addPerson(person){
	return{
		type: 'ADD',
		payload: person
	}
}
export function displayPerson(person, rowIndex){
	return{
		type: 'DISPLAY',
		payload: person,
		rowIndex: rowIndex
	}
}
export function editPerson(person){
	return{
		type: 'EDIT',
		payload: person
	}
}
export function deletePerson(person){
	return{
		type: 'DELETE',
		payload: person
	}
}
export function loadDefaultAction(user){
	return{
		type: 'DEFAULT',
		payload: user
	}
}