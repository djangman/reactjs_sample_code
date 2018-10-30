import { 
	BASE_URL, FEEDS_CHANGE_DIGIT_SUCCESS,
	FEEDS_ADD_DATA_SUCCESS, FEEDS_ADD_DATA_SUCCESS_NA,
	FEEDS_DEL_FEED_SUCCESS, FEEDS_DEL_FEED_SUCCESS_NA
	} from "../constants";
import { apiClient } from "../utils/ApiClient";


export function feedsDeleteFeedSuccess(id) {
	return {
	   type: FEEDS_DEL_FEED_SUCCESS,
	   id
   };
}

export function feedsDeleteFeedSuccess_na(id) {
	return {
		type: FEEDS_DEL_FEED_SUCCESS_NA,
		id
	};
}

export function feedsAddDataSuccess(new_feed) {
		return {
			type: FEEDS_ADD_DATA_SUCCESS,
			new_feed
		};
}


export function feedsAddDataSuccess_na(new_feed) {
		return {
			type: FEEDS_ADD_DATA_SUCCESS_NA,
			new_feed
		};
}

/***
 * Action to take care of moving a RSS Feed from active to inactive or reverse
 */

async function moveToInactive(feedobj, dispatch) {

	if (feedobj.active === 1) {
		await dispatch(feedsDeleteFeedSuccess(feedobj.feed_id));
		feedobj.active = 0;
		dispatch(feedsAddDataSuccess_na(feedobj));
	} else {
		await dispatch(feedsDeleteFeedSuccess_na(feedobj.feed_id));
		feedobj.active = 1;
		dispatch(feedsAddDataSuccess(feedobj));
	}

}


/***
 *  Changes boolean ( tinyint ) fields in the rssfeeds table  
 */

export function postFieldToggle (feedobj)  {
	//console.log(feedobj);
	let axios_instance = apiClient();
	var params = new URLSearchParams();
	params.append('field', "active");
	params.append('fieldValue', (feedobj.active) ? 0 : 1);
	params.append('id', feedobj.feed_id);
	params.append('table', "rssfeeds");
	params.append('action', 'postBool');
	const request = axios_instance.post(BASE_URL, params);
	return (dispatch) => {
		request.then((response) => {
			if (response.data["result"] !== "success") {
				throw Error("error occurred");
			}
			return response;
        })
		.then((response) => { 
			moveToInactive(feedobj, dispatch);
			
		})
		.then(() => {
			//console.log("success");
		})
    
	};	

}

/***
 *		Updates the filter string for each feed ( to exclude 
 * 		particular podcast episodes/blog entries from being posted )
 */

export function postFilterChange(val, id ) {
	let axios_instance = apiClient();
	var params = new URLSearchParams();
	params.append('fieldValue', val);
	params.append('id', id);
	params.append('action', 'update_filter');
	const request = axios_instance.post(BASE_URL, params);
	return (dispatch) => {
		request.then((response) => {
			if (response.data["result"] !== "success") {
				throw Error("error occurred");
			}
			return response;
		})
	};

}

/*** 
 * Changes various integer fields in rssfeeds table
 * 
*/

export function postFlagChange (field, field_value, id)  {
	let axios_instance = apiClient();
	var params = new URLSearchParams();
	params.append('field', field);
	params.append('fieldValue', field_value);
	params.append('id', id);
	params.append('table', "rssfeeds");
	params.append('action', 'postDigit');
	console.log(params);
	const request = axios_instance.post(BASE_URL, params);
	return (dispatch) => {
		request.then((response) => {
			if (response.data["result"] !== "success") {
				throw Error("error occurred");
			}
			return response;
        })
		
		.then(() => {
			console.log("success");
		})
    
	};	

}
// ==================================================================

export function changeFieldSuccess(id) {
    return {
        type: FEEDS_CHANGE_DIGIT_SUCCESS,
        id
    };
}


