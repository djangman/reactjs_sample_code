import { FETCH_RSSFEEDS, 
		API_URL_GET_FEEDS, 
		API_URL_GET_FEEDS_NA, 
		FEEDS_HAS_ERRORED, 
		FEEDS_IS_LOADING, 
		FEEDS_FETCH_DATA_SUCCESS,
		FEEDS_FETCH_ITEM_SUCCESS,
		FEEDS_FETCH_DATA_SUCCESS_NA,
		BASE_URL  } from "../constants";
import { itemsDeleteItemSuccess } from "./itemlist";
import axios from 'axios';
import { apiClient } from "../utils/ApiClient";
import { setItemsLoaded } from "./set_data_loaded";

export function fetchFeeds ()  {

    const request = axios.get(API_URL_GET_FEEDS);

    return {
        type: FETCH_RSSFEEDS,
        payload: request
    }

}
// ==================================================================

export function feedsHasErrored(bool) {
    return {
        type: FEEDS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function feedsIsLoading(bool) {
    return {
        type: FEEDS_IS_LOADING,
        isLoading: bool
    };
}

export function feedsFetchDataSuccess(feeds) {
    return {
        type: FEEDS_FETCH_DATA_SUCCESS,
        feeds
    };
}

export function feedsFetchDataSuccessNA(feeds_na) {
    return {
        type: FEEDS_FETCH_DATA_SUCCESS_NA,
        feeds_na
    };
}


export function feedsFetchItemSuccess(items) {

    return {
        type: FEEDS_FETCH_ITEM_SUCCESS,
        items
    };
}

export function feedsAddDataSuccess(new_feed) {

    return {
        type: 'FEEDS_ADD_DATA_SUCCESS',
        new_feed
    };
}


export function feedsFetchData() {
	
	let axios_instance = apiClient();
	
	return (dispatch) => {
		dispatch(feedsIsLoading(true));
			axios_instance.get(API_URL_GET_FEEDS)
			.then((response) => {
				if (response.data["result"] !== "success") {
					throw Error("error occurred");
				}
				//console.log(response.data);
				dispatch(feedsIsLoading(false));
				return response;
			})
			.then((response) => response.data.feeds)
			.then((feeds) => { 
				console.log(feeds);
		
				dispatch(feedsFetchDataSuccess(feeds))
			} )
			.catch(() => dispatch(feedsHasErrored(true)));
	};
}

// ------------------------------------------------------------------

export function feedsFetchDataNA() {
	let axios_instance = apiClient();
	
    return (dispatch) => {
        dispatch(feedsIsLoading(true));
         axios_instance.get(API_URL_GET_FEEDS_NA)
            .then((response) => {
				if (response.data["result"] !== "success") {
					throw Error("error occurred");
                }
				//console.log(response.data);
                dispatch(feedsIsLoading(false));
                return response;
            })
            .then((response) => response.data.feeds)
            .then((feeds_na) => { 
		
				dispatch(feedsFetchDataSuccessNA(feeds_na)) 
			} )
            .catch(() => dispatch(feedsHasErrored(true)));
    };
}
    


export function readFeed (feedurl, feedname, feed_id)  {
	//alert("in readfeed");
	let post_url = "";
    post_url = BASE_URL;
	var params = new URLSearchParams();
	params.append('feedurl', feedurl);
	params.append('feedname', feedname);
	params.append('action', 'getItems');
	params.append('feed_id', feed_id);
	
	const request = axios.post(post_url, params);
 	return (dispatch) => {
		// axios.post(post_url,params).then((response) => {
		 request.then((response) => {
			
			if (response.data["result"] !== "success") {
				throw Error("error occurred");
			}
			return response;
        })
		.then((response) => response.data.items)
		.then((items) => {
             
				dispatch(feedsFetchItemSuccess(items)) 
		})
          //  .catch(() => dispatch(feedsHasErrored(true)));
	};	

}

export function AddNewFeed (feedurl, feed_name)  {
	let axios_instance = apiClient();
	let post_url = "";
    post_url = BASE_URL;
	var params = new URLSearchParams();
	params.append('feedurl', feedurl);
	params.append('name', feed_name);
	const request = axios_instance.post(post_url, params);

	 return (dispatch) => {
		// axios.post(post_url,params).then((response) => {
		 request.then((response) => {
			if (response.data["result"] !== "success") {
				throw Error("error occurred");
			}
			return response;
        })
		.then((response) => response.data.new_feed)
		.then((new_feed) => {
				dispatch(feedsAddDataSuccess(new_feed));
				readFeed(feedurl, feed_name, new_feed.feed_id);
				dispatch(setItemsLoaded(false));
				
		})
          .catch(() => dispatch(feedsHasErrored(true)));
	};	
}


export function DeleteFeed (id, active)  {
	let axios_instance = apiClient();
	let post_url = "";
    post_url = BASE_URL;
	var params = new URLSearchParams();
	params.append('feed_id', id);
	params.append('deletefeed', 1);
	const request = axios_instance.post(post_url, params);
	

	 return (dispatch) => {
		 request.then((response) => {
			//console.log(response);
			if (response.data["result"] !== "success") {
				throw Error("error occurred");
			}
			return response;
        })
		.then((response) => { 
			if (active) {
				dispatch(feedsDeleteFeedSuccess(id));
			} else {
				dispatch(feedsDeleteFeedSuccess_na(id));
			}
			if (response.data["items_deleted"]) {
				dispatch(itemsDeleteItemSuccess(response.data['items_deleted']));
				dispatch(setItemsLoaded(false));
			}
			
		})
		.catch(() => dispatch(feedsHasErrored(true)));
	};	
}

