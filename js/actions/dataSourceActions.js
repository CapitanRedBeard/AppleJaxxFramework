// *** Action Types ***
export const INIT_OAUTH = 'INIT_OAUTH'
export const AUTHORIZE = 'AUTHORIZE'

// *** Action Creators ***
export function initializeOAuth(oAuthConfig) {
	return {
		type: INIT_OAUTH,
		config: oAuthConfig
	}
}

export function oAuthAuthorize(provider, options) {
	return {
		type: AUTHORIZE,
		provider,
		options
	}
}
