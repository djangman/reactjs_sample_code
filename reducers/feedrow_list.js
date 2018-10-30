import { 
	FEEDS_ADD_DATA_SUCCESS_NA, 
	FEEDS_ADD_DATA_SUCCESS, FEEDS_DEL_FEED_SUCCESS_NA, FEEDS_DEL_FEED_SUCCESS,
	FEEDS_FETCH_DATA_SUCCESS, FEEDS_FETCH_DATA_SUCCESS_NA
	} from "../constants";

export function feedsHasErrored(state = false, action) {
    switch (action.type) {
        case 'FEEDS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function feedsIsLoading(state = false, action) {
    switch (action.type) {
        case 'FEEDS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function feeds_na(state = [], action) {
	//console.log(action);
	switch (action.type) {
		
		// case FEEDS_FETCH_DATA_SUCCESS_NA:
		// 	console.log(action.feeds_na);
		// 	var $newarray =	action.feeds_na.map(feed => {
		// 		console.log(feed.url);
		// 		Object.assign({}, feed, { keynum: feed.url})
		// 	}
		// 	);
		// 	console.log($newarray);
		// 	return $newarray;

		case FEEDS_FETCH_DATA_SUCCESS_NA:
			return action.feeds_na;

		case FEEDS_DEL_FEED_SUCCESS_NA:
			const feedIdNA = action.id;
			return state.filter(comment => comment.feed_id !== feedIdNA);        
		
		case FEEDS_ADD_DATA_SUCCESS_NA:
			console.log('in the right reducer place');
			return [ ...state,{
							feed_id: action.new_feed.feed_id, 
							url:  action.new_feed.feedurl, 
							name: action.new_feed.name,
							active: 0
						}];
			
		default:
			return state;
	}
}

export function feeds(state = [], action) {

    switch (action.type) {
		
		case FEEDS_FETCH_DATA_SUCCESS:
			//console.log(action.feeds);
			// var $newarray =	action.feeds.map(feed => {
			// 		//console.log(feed);
			// 		console.log(feed.url);
			// 		Object.assign({}, feed, { keynum: feed.feed_id})
			// 	}	
			// 	);
			// 	console.log($newarray);
			//return $newarray;
			return action.feeds;
		
		case FEEDS_ADD_DATA_SUCCESS:
			return [ ...state,{
							feed_id: action.new_feed.feed_id, 
							url:  action.new_feed.feedurl, 
							name: action.new_feed.name,
							active: 1
						}];

		case FEEDS_DEL_FEED_SUCCESS:
       
			const feedId = action.id;
			return state.filter(comment => comment.feed_id !== feedId);        
		
		default:
			return state;


    }
}
