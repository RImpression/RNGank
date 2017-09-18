'use strict';
import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Navigator,
    Image,
    StyleSheet,
} from 'react-native';
import TabNavigator from "react-native-tab-navigator";
import HomeView from './view/HomeView';
import ClassificationView from './view/ClassificationView';
import WelfareView from './view/WelfareView';
import AboutView from './view/AboutView';

const SELECTED_TAG = 'selected';
const SELECTED_TITLE = '精选';
const SELECTED_NORMAL = require('./../images/member_hot_normal.png');
const SELECTED_FOCUS = require('./../images/member_hot_press.png');

const SORT_TAG = 'sort';
const SORT_TITLE = '分类';
const SORT_NORMAL = require('./../images/member_sort_normal.png');
const SORT_FOCUS = require('./../images/member_sort_press.png');

const WELFARE_TAG = 'welfare';
const WELFARE_TITLE = '福利';
const WELFARE_NORMAL = require('./../images/member_welfare.normal.png');
const WELFARE_FOCUS = require('./../images/member_welfare.press.png');

const ABOUT_TAG = 'about';
const ABOUT_TITLE = '关于';
const ABOUT_NORMAL = require('./../images/member_about_normal.png');
const ABOUT_FOCUS = require('./../images/member_about_press.png');

class MainNav extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedTab:SELECTED_TAG
        };
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {


        return(
            <TabNavigator
                tabBarStyle={styles.tab_container}
                tabBarShadowStyle={{height: 0}}>
                {this._renderTabItem(SELECTED_TAG, SELECTED_TITLE, SELECTED_NORMAL, SELECTED_FOCUS)}
                {this._renderTabItem(SORT_TAG, SORT_TITLE, SORT_NORMAL, SORT_FOCUS)}
                {this._renderTabItem(WELFARE_TAG, WELFARE_TITLE, WELFARE_NORMAL, WELFARE_FOCUS)}
                {this._renderTabItem(ABOUT_TAG, ABOUT_TITLE, ABOUT_NORMAL, ABOUT_FOCUS)}
            </TabNavigator>
        )
    }
    /**
     * 渲染tab中的item
     * @param tag
     * @param title
     * @param iconNormal
     * @param iconFocus
     * @param pageView
     * @returns {XML}
     * @private
     */
    _renderTabItem(tag, title, iconNormal, iconFocus) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                title={title}
                titleStyle={styles.tab_title}
                selectedTitleStyle={styles.tab_title_selected}
                renderIcon={() => <Image source={iconNormal} style={styles.tab_icon}/>}
                renderSelectedIcon={() => <Image source={iconFocus} style={styles.tab_icon}/>}
                onPress={() => this.setState({selectedTab: tag})}>
                {this._createContentPage(tag)}
            </TabNavigator.Item>
        )
    }

    /**
     * 渲染tab对应的内容页面
     * @param tag
     * @returns {XML}
     * @private
     */
    _createContentPage(tag) {
        switch (tag) {
            case SELECTED_TAG:
                return (<HomeView {...this.props}/>);
            case SORT_TAG:
                return (<ClassificationView {...this.props}/>);
            case WELFARE_TAG:
                return (<WelfareView {...this.props}/>);
            case ABOUT_TAG:
                return (<AboutView {...this.props}/>);
        }
    }
}

const styles = StyleSheet.create({
    tab_container: {
        height: 46,
        backgroundColor:'#4c4c4c'
    },
    tab_icon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    tab_title: {
        color: "#FFFFFF",
        fontSize: 11,
    },
    tab_title_selected: {
        color: "#000000",
        fontSize: 11,
    }
});

export default MainNav;
