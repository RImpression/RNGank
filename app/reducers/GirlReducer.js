/**
 * 福利reducer
 */
import {FETCH_GANK_GIRL_STATUS} from '../actions/ActionTypes';

const initialStare = {
    status:FETCH_GANK_GIRL_STATUS.START,
    dataSource:[],
    isRefreshing:false,
    isLoadMore:true,
    opt:0,
};

export default function GirlReducer(state=initialStare, action) {
    switch (action.type) {
        case FETCH_GANK_GIRL_STATUS.START:
            return {
                ...state,
                status:action.type,
                opt:action.opt,
                isRefreshing:action.opt === 1,
            };
        case FETCH_GANK_GIRL_STATUS.SUCCESS:
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
        case FETCH_GANK_GIRL_STATUS.FAILURE:
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