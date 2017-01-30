// *** Action Types ***
export const ADD_ICON_SOURCES = 'ADD_ICON_SOURCES'

// *** Action Creators ***
export function addIconSources(iconsSources) {
	return {
		type: ADD_ICON_SOURCES,
    iconsSources
	}
}
