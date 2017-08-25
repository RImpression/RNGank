/**
 * TabBar 顶部菜单通用组件
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    RefreshControl,
    InteractionManager,
    ActivityIndicator,
} from 'react-native';
import {fetchGankSortData} from '../actions/GankApi'
import {connect} from 'react-redux';
import {FETCH_GANK_SORT_STATUS} from '../actions/ActionTypes'
import ToastUtils from '../utils/ToastUtils';
import SortListCell from '../compoments/listCell/SortListCell';
import DateUtils from '../utils/DateUtils';
import WebDetailView from './WebDetailView';

class CellCommonView extends Component {
    constructor(props) {
        super(props);
        this.curPageNo = 1;
        this.isLoadMoreing = false;
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this._fetchData(this.props.tabLabel,0);
        })
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.status ===  FETCH_GANK_SORT_STATUS.START) {
            return false;
        } else if (nextProps.status ===  FETCH_GANK_SORT_STATUS.FAILURE) {
            if (nextProps.opt === 1) {
                // 下拉刷新失败
                ToastUtils.showToast('刷新数据失败了...');
                return false;
            } else if (nextProps.opt === 2) {
                // 加载更多失败
                ToastUtils.showToast('加载更多数据失败了...');
                this.curPageNo
                this.isLoadMoreing = false;
                return false;
            }
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        // 处理加载更多操作时，在数据加载完成并渲染完界面后，将加载更多的状态重置
        if (prevProps.opt === 2) {
            this.isLoadMoreing = false;
        }
    }

    /**
     * 请求数据
     * @param sort 分类
     * @param opt 当前加载页数
     * @private
     */
    _fetchData(sort,opt) {
        this.curPageNo = opt !== 2 ? 1 : (this.curPageNo + 1);
        this.props.dispatch(fetchGankSortData(sort,opt,this.curPageNo));
    }

    initSource() {
        switch (this.props.tabLabel) {
            case 'Android':
                return this.props.androidSource;
            case 'iOS':
                return this.props.iosSource;
            case '前端':
                return this.props.webSource;
            case '瞎推荐':
                return this.props.randomSource;
            case '拓展资源':
                return this.props.extendedSource;
            case '休息视频':
                return this.props.videoSource;
            default:
                return [];
        }
    }

    render(){
        let sortSource = this.initSource();
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(sortSource);
        let contentView;
        contentView = (
            <ListView
                dataSource={dataSource}
                renderRow={this._renderRow}
                automaticallyAdjustContentInsets={false}
                enableEmptySections={true}
                onEndReachedThreshold={5}
                onEndReached={this.props.isLoadMore?this._onLoadMore.bind(this):null}
                renderFooter={this.props.isLoadMore?this._footerView:null}
                renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                refreshControl={
                <RefreshControl
                    refreshing={this.props.isRefreshing}
                    onRefresh={this._onRefresh}
                    tintColor='#AAAAAA'
                    title='下拉刷新'
                    progressBackgroundColor='#FFFFFF'/>}
            />
        );
        return(
            <View style={styles.container}>
                {contentView}
            </View>
        )
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh() {
        this._fetchData(this.props.tabLabel,1);
    }

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        if (this.isLoadMoreing) {
            return;
        }

        this.isLoadMoreing = true;

        // 延迟1秒再调用数据
        setTimeout(() => {
            this._fetchData(this.props.tabLabel,2);
        }, 1000)
    }

    /**
     * 底部加载更多View
     * @returns {XML}
     * @private
     */
    _footerView() {
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator styleAttr="Small" />
                <Text>
                    正在加载中...
                </Text>
            </View>
        );
    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <View style={{width:Common.size.width}}>
                <SortListCell
                    desc = {rowData.desc}
                    type = {rowData.type}
                    who = {rowData.who}
                    publishedAt = {DateUtils.getShowDate(rowData.publishedAt)}
                    clickAction = {()=>{this.props.navigator.push({
                        component:WebDetailView,
                        params:{url:rowData.url,title:rowData.desc},
                    });}}/>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
    },
});

function select(store) {
    return {
        status: store.sortViewStore.status,
        isRefreshing: store.sortViewStore.isRefreshing,
        isLoadMore: store.sortViewStore.isLoadMore,
        opt: store.sortViewStore.opt,
        androidSource: store.sortViewStore.androidSource,
        iosSource: store.sortViewStore.iosSource,
        webSource: store.sortViewStore.webSource,
        randomSource: store.sortViewStore.randomSource,
        extendedSource: store.sortViewStore.extendedSource,
        videoSource: store.sortViewStore.videoSource,
    }
}
export default connect(select)(CellCommonView);