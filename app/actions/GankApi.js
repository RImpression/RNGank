import {
    FETCH_GANK_DAY_STATUS,
    FETCH_GANK_SORT_STATUS,
    FETCH_GANK_GIRL_STATUS,
    FETCH_GANK_DAILY_STATUS,
} from './ActionTypes';
import HttpUtils from '../utils/HttpUtils';

const PAGE_NUM = 10;

/**
 * 获取历史干货数据（默认10条数据）
 * @param opt   0初始化加载数据，1下拉刷新，2加载更多
 * @param pageNo    当前加载的页码数
 * @returns {*}
 */
export function fetchGankDayData(opt,pageNo) {
    return fetchGankDayList(FETCH_GANK_DAY_STATUS,opt,pageNo);
};

function fetchGankDayList(typeObj,opt,pageNo) {
    return (dispatch) => {
        dispatch({type:typeObj.START,opt:opt});
        let URL = `http://gank.io/api/history/content/${PAGE_NUM}/${pageNo}`;
        return HttpUtils.fetchGet(URL)
            .then((result)=>{
                dispatch({type:typeObj.SUCCESS,opt,data:result})
            })
            .catch((error)=>{
                dispatch({type:typeObj.FAILURE,opt,error})
            });
    }
}

/**
 * 获取福利妹子图片
 * @param opt   0初始化加载数据，1下拉刷新，2加载更多
 * @param pageNo 当前加载页数
 * @returns {*}
 */
export function fetchGankGirlData(opt, pageNo) {
    return fetchGankSortList(FETCH_GANK_GIRL_STATUS,opt,'福利',pageNo);
}

/**
 * 获取干货分类数据
 * @param sort
 * @param opt
 * @param pageNo
 * @returns {function(*)}
 */
export function fetchGankSortData(sort, opt, pageNo) {
    return fetchGankSortList(FETCH_GANK_SORT_STATUS,opt,sort,pageNo);
}

/**
 * 获取干货分类数据
 * @param typeObj 指定Action Type对象
 * @param opt 0初始化加载数据，1下拉刷新，2加载更多
 * @param sort 分类（all | Android | iOS | 休息视频 | 福利 | 拓展资源 | 前端 | 瞎推荐 | App）
 * @param pageNo 当前加载页数
 * @returns {function(*)}
 */
function fetchGankSortList(typeObj,opt,sort,pageNo) {
    return (dispatch) => {
        dispatch({type:typeObj.START,opt:opt});
        let URL = `http://gank.io/api/data/${sort}/${PAGE_NUM}/${pageNo}`;
        return HttpUtils.fetchGet(URL)
                .then((result)=>{
                    dispatch({type:typeObj.SUCCESS,opt,sort,data:result});
                })
                .catch((error)=>{
                    dispatch({type:typeObj.FAILURE,opt,sort,error});
                });
    }
}

/**
 * 获取某日数据集合
 * @param dateString  日期 2017/08/30
 * @returns {*}
 */
export function fetchGankDailyData(dateString) {
    return fetchGankDaily(FETCH_GANK_DAILY_STATUS,dateString);
}

function fetchGankDaily(typeObj,dateString) {
    return (dispatch) => {
        dispatch({type:typeObj.START});
        let URL = `http://gank.io/api/day/${dateString}`
        return HttpUtils.fetchGet(URL)
            .then((result)=>{
                dispatch({type:typeObj.SUCCESS,data:result});
            })
            .catch((error)=>{
                dispatch({type:typeObj.FAILURE,error});
            })
    }
}

/**
 * 清空store数据
 * @returns {function(*)}
 */
export function clearGankDaily() {
    return(dispatch) => {
        dispatch({type:FETCH_GANK_DAILY_STATUS.START});
    }
}