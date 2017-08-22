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
    TouchableOpacity,
} from 'react-native';
import {
    LazyloadScrollView,
    LazyloadImage
} from 'react-native-lazyload';
import { connect } from 'react-redux';
import NavigationBar from './common/NavigationBar';
import WebDetailView from './WebDetailView';
import ToastUtils from '../utils/ToastUtils';
import { fetchGankGirlData } from '../actions/GankApi';
import {FETCH_GANK_GIRL_STATUS} from '../actions/ActionTypes';

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

    /**
     * 加载妹纸列表数据
     */
    _fetchData(opt) {
        this.curPageNo = opt !== 2 ? 1 : (this.curPageNo + 1);
        this.props.dispatch(fetchGankGirlData(opt, this.curPageNo));
    }

    _getImages(items, navigator){
        return(
            items.map((item,i)=>{
                return(
                    <TouchableOpacity key = {i}   style={{padding:2}} onPress = {()=>{}}>
                        <LazyloadImage
                            host="lazy-scroll"
                            key = {i+'_'+item._id} style={{height:parseInt(Math.random() * 20 + 12) * 10,width:(width-8)/2}} source = {{uri :item.url}}>
                        </LazyloadImage>
                    </TouchableOpacity>

                )
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

    render() {
        const {navigator} = this.props;
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'福利'}
                />
                <LazyloadScrollView
                    name="lazy-scroll"
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor='#AAAAAA'
                            title='下拉刷新'
                            progressBackgroundColor='#FFFFFF'/>}>
                    <View style = {{flexDirection : 'row'}}>
                        <View>
                            {this._getImages(this.props.dataSource.slice(0, 5), navigator)}
                        </View>
                        <View>
                            {this._getImages(this.props.dataSource.slice(5, 10), navigator)}
                        </View>

                    </View>
                </LazyloadScrollView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
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