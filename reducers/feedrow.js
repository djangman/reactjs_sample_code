import { API_URL_UPDATE_FLAG, FEEDS_CHANGE_DIGIT_SUCCESS, FIELD_CHANGE_ERRORED } from "../constants";

export function row(state, action) {
    
    switch (action.type) {
		case FEEDS_CHANGE_DIGIT_SUCCESS:
			const feedId = action.id;
			return state.filter(comment => comment.feed_id !== feedId);        
		default:
			return state;

	}
}
