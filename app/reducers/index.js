import { combineReducers } from 'redux';
import GirlReducer from './GirlReducer';
import RecommendReducer from './RecommendReducer';
import SortReducer from './SortReducer';
import DailyReducer from './DailyReducer';

export default combineReducers({
    girlViewStore: GirlReducer,
    homeViewStore: RecommendReducer,
    sortViewStore: SortReducer,
    dailyViewStore:DailyReducer,
});