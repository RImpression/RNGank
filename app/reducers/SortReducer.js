/**
 * 分类列表Reducer
 */
import {FETCH_GANK_SORT_STATUS} from '../actions/ActionTypes';

const initialStare = {
    status:FETCH_GANK_SORT_STATUS.START,
    dataSource:[],
    isRefreshing:false,
    isLoadMore:true,
    opt:0,
};

export default function SortReducer(state=initialStare, action) {
    switch (action.type) {
        case FETCH_GANK_SORT_STATUS.START:
            return {
                ...state,
                status:action.type,
                opt:action.opt,
                isRefreshing:action.opt === 1,
            };
        case FETCH_GANK_SORT_STATUS.SUCCESS:
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
        case FETCH_GANK_SORT_STATUS.FAILURE:
            console.log(222222);
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