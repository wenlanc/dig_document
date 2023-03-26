export const SelectedFieldReducer = (state = null, action) => {
	switch (action.type) {
		case 'SELECT_FIELD_ON_DOCUMENT':
			return action.payload;
		case 'SELECT_FIELD_UPDATE_ON_DOCUMENT':
			return { ...state, ...action.payload }
		case 'SELECT_FIELD_REMOVE_ON_DOCUMENT':
			return null;	
		default:
			return state;
	}
};
