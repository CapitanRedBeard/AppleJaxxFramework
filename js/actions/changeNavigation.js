
export function navigatePush(newNav){
  state = typeof state === 'string' ? { key: state, title: state } : state
	return {
		type: PUSH_NEW_ROUTE,
		state
	}
}
