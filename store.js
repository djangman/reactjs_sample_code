import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
//import promise from 'redux-promise'
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default (initialstate, init) => {
	if ( init ) {
		return createStoreWithMiddleware(rootReducer, initialstate);
	} else {
		return createStoreWithMiddleware(rootReducer);
	}
}