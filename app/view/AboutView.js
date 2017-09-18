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
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
const statusHeight = StatusBar.currentHeight == 25 ? 0 : StatusBar.currentHeight;
import AboutData from '../config/AboutData.json';

export default class AboutView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animating:true,
        };
    }
    componentDidMount() {

    }

    //顶部返回键
    renderFixedView = () => {
        return(
            <View style={styles.fixedSection}>
            </View>
        )
    };

    //上滑显示标题
    renderStickyView = () => {
        return(
            <View style={styles.stickySection}>
                <Text style={styles.title_text}>关于</Text>
            </View>
        )
    };
    //滑动图片
    renderForegroundView = () => {
        return (
            <View style={styles.image_view}>
                <Image style={{height:100,width:100,borderRadius:50,borderWidth:3,borderColor:'#FFFFFF'}}
                       source={require('./../../images/app_icon.png')}
                       resizeMode='cover'/>
                <Text style={{fontSize:17,color:'#4c4c4c',paddingTop:10,fontWeight:'400'}}>{AboutData.appName}</Text>
                <Text style={{fontSize:16,color:'#4c4c4c',paddingTop:8,fontWeight:'400'}}>{AboutData.appInfo}</Text>
            </View>

        )
    };

    renderBackground = () => {
        return (
            <View style={{height: 300+statusHeight}}>
                <Image style={{height:300+statusHeight,width:Common.size.width}}
                       source={require('./../../images/about_background.png')}
                       resizeMode='cover'/>
            </View>

        )
    };

    render() {
        let content = [];
        content.push(
            <View key="about">
                <CellView
                    title={AboutData.introduce.title}
                    content={AboutData.introduce.content}/>
                <CellView
                    title={AboutData.source.title}
                    content={AboutData.source.content}/>
            </View>

        );

        return (
            <ParallaxScrollView
                backgroundColor="#4c4c4c"
                contentBackgroundColor="#FFFFFF"
                parallaxHeaderHeight={300+statusHeight}
                stickyHeaderHeight={44+statusHeight}
                renderFixedHeader={this.renderFixedView}
                renderStickyHeader={this.renderStickyView}
                renderBackground={this.renderBackground}
                renderForeground={this.renderForegroundView}>
                <View style={{ height: 600 }}>
                    {content}
                </View>
            </ParallaxScrollView>
        )
    }
}

class CellView extends Component {
    render() {
        return (
            <View style={{padding: 10,backgroundColor:'#F4F4F4'}}>
                <View style={{paddingVertical:5}}>
                    <Text style={{fontSize:16,color:'#4c4c4c'}}>{this.props.title}</Text>
                </View>
                <View style={{padding:12,backgroundColor:'#FFFFFF'}}>
                    <Text style={{fontSize:14,color:'#4c4c4c',lineHeight:23}}>{this.props.content}</Text>
                </View>
            </View>
        )
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
        height: 300+statusHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : statusHeight,
    },
});



