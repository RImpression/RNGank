/**
 * 推荐列表Reducer
 */
import {FETCH_GANK_DAY_STATUS} from '../actions/ActionTypes';

const initialState = {
        status:FETCH_GANK_DAY_STATUS.START,
        dataSource:[],
        isRefreshing:false,
        isLoadMore:true,
        opt:0,
};

export default function RecommendReducer(state = initialState,action) {
    switch (action.type) {
        case FETCH_GANK_DAY_STATUS.START:
            return {
                ...state,
                status:action.type,
                opt:action.opt,
                isRefreshing:action.opt === 1,
            };
        case FETCH_GANK_DAY_STATUS.SUCCESS:
            let content = action.opt === 2 ? [...state.dataSource,...action.data.results] : action.data.results;
            let isLoadMore = action.data.results.length === 10;
            return {
                ...state,
                dataSource:content,
                status:action.type,
                opt:action.opt,
                isRefreshing:false,
                isLoadMore:isLoadMore
            };
        case FETCH_GANK_DAY_STATUS.FAILURE:
            return {
                ...state,
                status:action.type,
                opt:action.opt,
                isRefreshing:false
            };
        default:
            return state;
    }
}