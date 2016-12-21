
export function navigatePush(state){
  state = typeof state === 'string' ? { key: state, title: state } : state
	return {
		type: PUSH_NEW_ROUTE,
		state
	}
}
