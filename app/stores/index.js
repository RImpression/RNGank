import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const logger = store => next => action => {
    if (typeof action === 'function') {
        // console.log('>>>> logger => dispatching a function');
    } else {
        // console.log('>>>> logger => dispatching', action);
    }

    let result = next(action);
    return result;
};

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducers, initialState);
}