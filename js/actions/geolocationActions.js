// *** Action Types ***
export const UPDATE_GEOLOCATION = 'UPDATE_GEOLOCATION'

// *** Action Creators ***
export function updateGeolocation(position) {

	return {
		type: UPDATE_GEOLOCATION,
		position
	}
}
