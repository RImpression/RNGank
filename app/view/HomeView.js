import React, {Component} from 'react';
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    StyleSheet,
    ListView,
    RefreshControl,
    InteractionManager,
    ActivityIndicator,
} from 'react-native';
import NavigationBar from './common/NavigationBar';
import {connect} from 'react-redux';
import {fetchGankDayData} from '../actions/GankApi';
import ToastUtils from '../utils/ToastUtils';
import {FETCH_GANK_DAY_STATUS} from '../actions/ActionTypes';
import CardListCell from '../compoments/listCell/CardListCell';
import ImgFromHtmlUtils from '../utils/ImgFromHtmlUtil';
import DateUtils from '../utils/DateUtils';
import DailyContentView from './DailyContentView';

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.curPageNo = 1;
        this.isLoadMoreing = false;
        this.state = {
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this._fetchData(0);
        })
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.status ===  FETCH_GANK_DAY_STATUS.START) {
            return false;
        } else if (nextProps.status ===  FETCH_GANK_DAY_STATUS.FAILURE) {
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
     * @param opt 当前加载页数
     * @private
     */
    _fetchData(opt) {
        this.curPageNo = opt !== 2 ? 1 : (this.curPageNo + 1);
        this.props.dispatch(fetchGankDayData(opt,this.curPageNo));
    }

    render() {
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.dataSource);
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
                <NavigationBar
                    title={'干货集中营'}
                />
                {contentView}
            </View>
        )
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh() {
        this._fetchData(1);
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
            this._fetchData(2);
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
        let imgUrl = ImgFromHtmlUtils.getImageSrc(rowData.content);
        return (
            <View style={{width:Common.size.width}}>
                <CardListCell
                    imgUrl={imgUrl}
                    title={rowData.title}
                    date={DateUtils.getShowDate(rowData.created_at)}
                    clickAction={()=>{this.props.navigator.push({
                        component:DailyContentView,
                        params:{dateString:'2017/08/28'},
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
        status: store.homeViewStore.status,
        dataSource: store.homeViewStore.dataSource,
        isRefreshing: store.homeViewStore.isRefreshing,
        isLoadMore: store.homeViewStore.isLoadMore,
        opt: store.homeViewStore.opt,
    }
}
export default connect(select)(HomeView);