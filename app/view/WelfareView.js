import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl,
    Dimensions,
    InteractionManager,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import {
    LazyloadScrollView,
    LazyloadImage
} from 'react-native-lazyload';
import { connect } from 'react-redux';
import NavigationBar from './common/NavigationBar';
import ToastUtils from '../utils/ToastUtils';
import { fetchGankGirlData } from '../actions/GankApi';
import {FETCH_GANK_GIRL_STATUS} from '../actions/ActionTypes';
import ImageDetailView from './ImageDetailView';

let {height, width} = Dimensions.get('window');
class WelfareView extends Component {
    constructor(props) {
        super(props);
        this.curPageNo = 1;
        this.isLoadMoreing = false;
        this.state = {
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this._fetchData(0);
        })
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.status ===  FETCH_GANK_GIRL_STATUS.START) {
            return false;
        } else if (nextProps.status ===  FETCH_GANK_GIRL_STATUS.FAILURE) {
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
     * 加载妹纸列表数据
     */
    _fetchData(opt) {
        this.curPageNo = opt !== 2 ? 1 : (this.curPageNo + 1);
        this.props.dispatch(fetchGankGirlData(opt, this.curPageNo));
    }

    _onImageClick(item, navigator){
        if(navigator){
            navigator.push({
                name:'ImageDetailView',
                component : ImageDetailView,
                params: {
                    image:item
                }
            })
        }
    }

    _getImages(items,isLeft, navigator){
        return(
            items.map((item,i)=>{
                if (isLeft && i%2==0) {
                    return(
                        <TouchableOpacity key = {i}   style={{padding:2}} onPress = {()=>this._onImageClick(item,navigator)}>
                            <LazyloadImage
                                host="lazy-scroll"
                                key = {i+'_'+item._id} style={{height:parseInt(Math.random() * 20 + 12) * 10,width:(width-8)/2}} source = {{uri :item.url}}>
                            </LazyloadImage>
                        </TouchableOpacity>
                    )
                } else if (!isLeft && i%2!=0) {
                    return(
                        <TouchableOpacity key = {i}   style={{padding:2}} onPress = {()=>this._onImageClick(item,navigator)}>
                            <LazyloadImage
                                host="lazy-scroll"
                                key = {i+'_'+item._id} style={{height:parseInt(Math.random() * 20 + 12) * 10,width:(width-8)/2}} source = {{uri :item.url}}>
                            </LazyloadImage>
                        </TouchableOpacity>
                    )
                }
            })
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
     * scrollview滑动的时候
     * @private
     */
    _onScroll(event) {
        if(this.isLoadMoreing){
            return;
        }
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if(y+height>=contentHeight-20){
           this.isLoadMoreing = true;
            // 延迟1秒再调用数据
            setTimeout(() => {
                this._fetchData(2);
            }, 1000)
        }
    }

    /**
     * 显示上啦加载view
     * @private
     */
    _renderLoadMore() {
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator styleAttr="Small" />
                <Text>
                    正在加载中...
                </Text>
            </View>
        );
    }

    render() {
        const {navigator} = this.props;
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'福利'}
                />
                <LazyloadScrollView
                    name="lazy-scroll"
                    onScroll={this._onScroll.bind(this)}
                    scrollEventThrottle={50}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor='#AAAAAA'
                            title='下拉刷新'
                            progressBackgroundColor='#FFFFFF'/>}>
                    <View style = {{flexDirection : 'row'}}>
                        <View>
                            {this._getImages(this.props.dataSource,true, navigator)}
                        </View>
                        <View>
                            {this._getImages(this.props.dataSource,false, navigator)}
                        </View>

                    </View>
                    {/*尾部上拉加载更多view*/}
                    {this._renderLoadMore()}
                </LazyloadScrollView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
});

function select(store) {
    return {
        status: store.girlViewStore.status,
        dataSource: store.girlViewStore.dataSource,
        isRefreshing: store.girlViewStore.isRefreshing,
        isLoadMore: store.girlViewStore.isLoadMore,
        opt: store.girlViewStore.opt,
    }
}

export default connect(select)(WelfareView);