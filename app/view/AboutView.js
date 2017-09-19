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
                <AuthorCell
                    title={AboutData.author.title}
                    author={AboutData.author.name}
                    motto={AboutData.author.motto}
                    des={AboutData.author.des}
                    avatar={AboutData.author.avatar}/>
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
                renderStickyHeader={this.renderStickyView}
                renderBackground={this.renderBackground}
                renderForeground={this.renderForegroundView}>
                <View style={{ height: 650 }}>
                    {content}
                </View>
            </ParallaxScrollView>
        )
    }
}

class CellView extends Component {
    render() {
        return (
            <View style={styles.cell_view}>
                <View style={{paddingVertical:5}}>
                    <Text style={styles.cell_text16}>{this.props.title}</Text>
                </View>
                <View style={styles.cell_content_view}>
                    <Text style={[styles.cell_text14,{lineHeight:23}]}>{this.props.content}</Text>
                </View>
            </View>
        )
    }
}

class AuthorCell extends Component {
    render() {
        return (
            <View style={styles.cell_view}>
                <View style={{paddingVertical:5}}>
                    <Text style={styles.cell_text16}>{this.props.title}</Text>
                </View>
                <View style={[styles.cell_content_view,{flexDirection:'row'}]}>
                    <View style={{flex:1}}>
                        <Image style={styles.cell_author_avatar}
                                source={{uri:this.props.avatar}}
                                resizeMode='cover'/>
                    </View>
                    <View style={{flex:4}}>
                        <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                            <Text style={styles.cell_text16}>{this.props.author}</Text>
                            <Text style={[styles.cell_text14,{marginLeft:25}]}>{this.props.motto}</Text>
                        </View>
                        <Text style={[styles.cell_text14,{paddingTop:5}]}>{this.props.des}</Text>
                    </View>
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
    cell_view:{
        padding: 10,
        backgroundColor:'#F4F4F4'
    },
    cell_content_view:{
        padding:12,
        backgroundColor:'#FFFFFF'
    },
    cell_text16:{
        fontSize:16,
        color:'#4c4c4c'
    },
    cell_text14:{
        fontSize:14,
        color:'#4c4c4c'
    },
    cell_author_avatar:{
        width:50,
        height:50,
        borderRadius:25,
        borderWidth:0.5,
        borderColor:'#4c4c4c'
    }
});



