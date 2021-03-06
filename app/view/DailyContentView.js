'use strict';
import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Platform,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    InteractionManager,
} from 'react-native';
import {connect} from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {fetchGankDailyData,clearGankDaily} from '../actions/GankApi';
import {FETCH_GANK_DAILY_STATUS} from '../actions/ActionTypes';
import {NavBarBackItem} from './../compoments/NavBarItems';
import WebDetailView from './WebDetailView';
import ImageDetailView from './ImageDetailView';
import NavigationBar from './common/NavigationBar';
const statusHeight = StatusBar.currentHeight == 25 ? 0 : StatusBar.currentHeight;

class DailyContentView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animating:true,
        };
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.props.dispatch(fetchGankDailyData(this.props.dateString))
        })
    }

    componentWillUnmount() {
        //清空store数据，防止点击其他条目时出现数据重载
        this.props.dispatch(clearGankDaily());
    }

    //顶部返回键
    renderFixedView = () => {
        return(
            <View style={styles.fixedSection}>
                <NavBarBackItem {...this.props}/>
            </View>
        )
    };
    //上滑显示标题
    renderStickyView = () => {
        return(
            <View style={styles.stickySection}>
                <Text style={styles.title_text}>{this.props.dateString}</Text>
            </View>
        )
    };
    //滑动图片
    renderForegroundView = () => {
        let welfare = this.props.result.福利;
        let uri;
        if (welfare) uri = welfare[0].url;
        return (
            <View style={styles.image_view}>
                <TouchableOpacity onPress={()=>{this.props.navigator.push({
                                component : ImageDetailView,
                                params: {image:welfare?welfare[0]:{} } })}}>
                    <Image style={{height:250+statusHeight,width:Common.size.width}}
                           source={{uri:uri}}
                           resizeMode='cover'/>
                </TouchableOpacity>
            </View>

        )
    };

    /**
     * 根据分类显示对应数据
     * @param data
     * @returns {XML}
     */
    renderCellView = (data) => {
        switch (data) {
            case 'Android':
                return <ContentCell
                    data = {this.props.result.Android}
                    type = 'Android'
                    navigator={this.props.navigator}/>;
            break;
            case 'iOS':
                return <ContentCell
                    data = {this.props.result.iOS}
                    type = 'iOS'
                    navigator={this.props.navigator}/>;
                break;
            case '前端':
                return <ContentCell
                    data = {this.props.result.前端}
                    type = '前端'
                    navigator={this.props.navigator}/>;
            break;
            case 'App':
                return <ContentCell
                    data = {this.props.result.App}
                    type = 'App'
                    navigator={this.props.navigator}/>;
                break;
            case '瞎推荐':
                return <ContentCell
                    data = {this.props.result.瞎推荐}
                    type = '瞎推荐'
                    navigator={this.props.navigator}/>;
            break;
            case '拓展资源':
                return <ContentCell
                    data = {this.props.result.拓展资源}
                    type = '拓展资源'
                    navigator={this.props.navigator}/>;
            break;
            case '休息视频':
                return <ContentCell
                    data = {this.props.result.休息视频}
                    type = '休息视频'
                    navigator={this.props.navigator}/>;
            break;
        }
    };

    render() {
        let category = Object.keys(this.props.result);
        let content = [];
        category.map((data,i)=>{
           content.push(
               <View key={i}>{this.renderCellView(data)}</View>
           )
        });
        if (this.props.status == FETCH_GANK_DAILY_STATUS.SUCCESS) {
            return (
                <ParallaxScrollView
                    backgroundColor="#4c4c4c"
                    contentBackgroundColor="#FFFFFF"
                    parallaxHeaderHeight={250+statusHeight}
                    stickyHeaderHeight={44+statusHeight}
                    renderFixedHeader={this.renderFixedView}
                    renderStickyHeader={this.renderStickyView}
                    renderForeground={this.renderForegroundView}>
                    <View style={{ height: 600 }}>
                        {content}
                    </View>
                </ParallaxScrollView>
            )
        } else if (this.props.status == FETCH_GANK_DAILY_STATUS.FAILURE) {
            return (
                <View style={styles.container}>
                    <NavigationBar title={this.props.dateString} />
                    <Text style={{fontSize:20,color:'#333333'}}>数据请求失败</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <NavigationBar title={this.props.dateString} />
                    <ActivityIndicator
                        animating={true}
                        color='#4c4c4c'
                        style={{height: 80}}
                        size="large" />
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        paddingTop: (Platform.OS === 'ios') ? 20 : statusHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stickySection: {
        height: 44+statusHeight,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : statusHeight,
        alignItems: 'center',
    },
    title_text:{
        fontSize:18,
        color:'#FFFFFF'
    },
    image_view:{
        height: 250+statusHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : statusHeight,
    },
});

function select(store) {
    return {
        status: store.dailyViewStore.status,
        category: store.dailyViewStore.category,
        result: store.dailyViewStore.result
    }
}
export default connect(select)(DailyContentView);

class ContentCell extends Component {

    render() {
        let content = [];
        if (this.props.data) {
            this.props.data.map((value,i)=>{
                content.push(
                    <TouchableOpacity  key={i} onPress={()=>{this.props.navigator.push({
                                                    component:WebDetailView,
                                                    params:{url:value.url,title:value.desc},
                                                });}}>
                        <View style={cellStyles.content_item}>
                            <Text style={cellStyles.content_text}>*  </Text>
                            <Text numberOfLines={3} style={cellStyles.content_text}>{value.desc}<Text style={cellStyles.author_text}>（via.{value.who}）</Text></Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
        return (
            <View style={cellStyles.cell_view}>
                <View style={{paddingVertical:14}}>
                    <Text style={cellStyles.title_text}>{this.props.type}</Text>
                </View>
                {content}
            </View>
        )
    }
}

const cellStyles = StyleSheet.create({
    cell_view:{
       paddingHorizontal:10
    } ,
    title_text:{
       fontSize:18,
       color:'black',
       fontWeight:'bold'
    },
    content_item:{
        flexDirection: 'row',
        paddingVertical:5
    },
    content_text:{
        fontSize:12,
        color:'#333333'
    },
    author_text:{
        fontSize:12,
        color:'#95989a'
    }
});
