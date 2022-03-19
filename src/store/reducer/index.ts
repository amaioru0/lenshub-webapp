import { combineReducers } from 'redux';
import lensReducer from './lens';
import { routerReducer } from 'connected-next-router'

// import { withReduxStateSync } from 'redux-state-sync';

const rootReducer = combineReducers({
    lens: lensReducer,
    router: routerReducer,
});

export default rootReducer;
// export default withReduxStateSync(rootReducer)