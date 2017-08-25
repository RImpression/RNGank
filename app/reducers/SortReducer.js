/**
 * 分类列表Reducer
 */
import {FETCH_GANK_SORT_STATUS} from '../actions/ActionTypes';

const initialStare = {
    status:FETCH_GANK_SORT_STATUS.START,
    androidSource:[],
    iosSource:[],
    webSource:[],
    randomSource:[],
    extendedSource:[],
    videoSource:[],
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
            this.content = [];
            let isLoadMore = action.data.results.length === 10;
            switch (action.sort) {
                case 'Android':
                    this.content = action.opt === 2 ? [...state.androidSource,...action.data.results] : action.data.results;
                    return {
                        ...state,
                        androidSource:content,
                        status:action.type,
                        opt:action.opt,
                        isRefreshing:false,
                        isLoadMore:isLoadMore
                    };
                case 'iOS':
                    this.content = action.opt === 2 ? [...state.iosSource,...action.data.results] : action.data.results;
                    return {
                        ...state,
                        iosSource:content,
                        status:action.type,
                        opt:action.opt,
                        isRefreshing:false,
                        isLoadMore:isLoadMore
                    };
                case '前端':
                    this.content = action.opt === 2 ? [...state.webSource,...action.data.results] : action.data.results;
                    return {
                        ...state,
                        webSource:content,
                        status:action.type,
                        opt:action.opt,
                        isRefreshing:false,
                        isLoadMore:isLoadMore
                    };
                case '瞎推荐':
                    this.content = action.opt === 2 ? [...state.randomSource,...action.data.results] : action.data.results;
                    return {
                        ...state,
                        randomSource:content,
                        status:action.type,
                        opt:action.opt,
                        isRefreshing:false,
                        isLoadMore:isLoadMore
                    };
                case '拓展资源':
                    this.content = action.opt === 2 ? [...state.extendedSource,...action.data.results] : action.data.results;
                    return {
                        ...state,
                        extendedSource:content,
                        status:action.type,
                        opt:action.opt,
                        isRefreshing:false,
                        isLoadMore:isLoadMore
                    };
                case '休息视频':
                    this.content = action.opt === 2 ? [...state.videoSource,...action.data.results] : action.data.results;
                    return {
                        ...state,
                        videoSource:content,
                        status:action.type,
                        opt:action.opt,
                        isRefreshing:false,
                        isLoadMore:isLoadMore
                    };
                default:
                    return {
                        ...state,
                        status:action.type,
                        opt:action.opt,
                        isRefreshing:false,
                        isLoadMore:isLoadMore
                    };
            }

        case FETCH_GANK_SORT_STATUS.FAILURE:
            console.log(222244);
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