// *** Action Types ***
export const DRAWER_TOGGLE = 'DRAWER_TOGGLE'
export const DRAWER_OPEN = 'DRAWER_OPEN'
export const DRAWER_CLOSE = 'DRAWER_CLOSE'


// *** Action Creators ***
export function toggleDrawer() {
	return {
		type: DRAWER_TOGGLE
	}
}

export function openDrawer() {
	return {
		type: DRAWER_OPEN
	}
}

export function closeDrawer() {
	return {
		type: DRAWER_CLOSE
	}
}
