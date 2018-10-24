import axios from 'axios';
import { Cookies }  from "react-cookie";

const cookies = new Cookies();

export const apiClient = function() {
		const token = cookies.get("csrf_token")
		//console.log("in apiclient fn: " + token)
		const params = {
			//  baseURL: URL,
				headers: {'Authorization': 'Token ' + token}
		};
		return axios.create(params);
}