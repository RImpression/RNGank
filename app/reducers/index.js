import { combineReducers } from 'redux';
import GirlReducer from './GirlReducer';
import RecommendReducer from './RecommendReducer';
import SortReducer from './SortReducer';

export default combineReducers({
    girlViewStore: GirlReducer,
    homeViewStore: RecommendReducer,
    sortViewStore: SortReducer,
});