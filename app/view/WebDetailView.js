'use strict'
import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    WebView,
    Platform,
    TouchableOpacity,
    Text,
    Share,
    View,
} from 'react-native'
import NavigationBar from './common/NavigationBar';
import {NavBarWebBackItem,NavBarRightItem} from './../compoments/NavBarItems';
import ToastUtils from '../utils/ToastUtils'

export default class WebDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            canGoBack: false,
            title: this.props.title,
        }
    }

    onBackPress(e) {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    /**
     * 系统分享
     * @param message 内容
     * @param url   链接
     * @param title 标题
     * @private
     */
    _shareContent(message,url) {
        Share.share({
            message: '【干货集中营】'+message+url,
            url: url,
        }) .then(this._showResult)
            .catch((error) => ToastUtils.showToast('分享失败: ' + error.message));
    }

    _showResult(result) {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log('shared with an activityType: ' + result.activityType)
            } else {
                console.log('shared');
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('dismissed');
        }
    }


    render() {
        return(
            <View style={styles.container}>
                <NavigationBar
                    navigator={this.props.navigator}
                    popEnabled={false}
                    leftButton={<NavBarWebBackItem
                                touchAction={()=>this.onBackPress()}
                                {...this.props}/>}
                    rightButton={<NavBarRightItem
                                icon={require('../../images/icon_share.png')}
                                isIcon={true}
                                clickAction={()=>{this._shareContent(this.state.title,this.state.url)}}
                                {...this.props}/>}
                    title={this.state.title}/>
                <WebView
                    ref={webView=>this.webView=webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    }
});