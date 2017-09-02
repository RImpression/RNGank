import {FETCH_GANK_DAILY_STATUS} from '../actions/ActionTypes';

const initialStare = {
    status:FETCH_GANK_DAILY_STATUS.START,
    category:[],
    result:[],
    error:false,
};

export default function DailyReducer(state=initialStare, action) {
    switch (action.type) {
        case FETCH_GANK_DAILY_STATUS.START:
            return {
                ...state,
                status:action.type,
                result:{},
            };
        case FETCH_GANK_DAILY_STATUS.SUCCESS:
            let category = action.data.category;
            let result = action.data.results;
            return {
                ...state,
                status:action.type,
                category:category,
                result:result,
            };
        case FETCH_GANK_DAILY_STATUS.FAILURE:
            return {
                ...state,
                status:action.type,
                error:action.error,
            };
        default:
            return state;
    }
}