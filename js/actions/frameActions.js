// *** Action Types ***
export const UPDATE_FRAME = 'UPDATE_FRAME'

// *** Action Creators ***
export function updateFrame(frame) {
	return {
		type: UPDATE_FRAME,
		frame
	}
}
