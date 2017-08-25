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
    View,
} from 'react-native'
import NavigationBar from './common/NavigationBar';
import {NavBarWebBackItem,NavBarRightItem} from './../compoments/NavBarItems';

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

    render() {
        return(
            <View style={styles.container}>
                <NavigationBar
                    navigator={this.props.navigator}
                    popEnabled={false}
                    leftButton={<NavBarWebBackItem
                                touchAction={()=>this.onBackPress()}
                                {...this.props}/>}
                    title={this.state.title}
                    rightButton={<NavBarRightItem
                                label="保存"
                                icon={require('../../images/member_welfare.press.png')}
                                clickAction={()=>{console.log('you click')}}
                                {...this.props}/>}
                />
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