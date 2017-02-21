import getURL from '../util/api';


// *** Action Types ***
export const DATA_ADD = 'DATA_ADD'

// *** Action Creators ***
function addDataSource(data, returnPath, binding) {
	return {
		type: DATA_ADD,
		data,
		returnPath,
		binding
	}
}

export async function getAndAddURLDataSource(dispatch, url, returnPath, binding) {
	const data = await getURL(url)
	// console.log("Dater", data, returnPath, binding);
	dispatch(addDataSource(data, returnPath, binding))
}
