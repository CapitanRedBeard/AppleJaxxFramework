// *** Action Types ***
export const UPDATE_BINDING = 'UPDATE_BINDING'
export const SET_INITIAL_BINDINGS = 'SET_INITIAL_BINDINGS'


// *** Action Creators ***
export function updateBinding(binding, value) {
	return {
		type: UPDATE_BINDING,
		binding,
    value
	}
}

export function setInitialBindings(bindings) {
	return {
		type: SET_INITIAL_BINDINGS,
		bindings
	}
}
