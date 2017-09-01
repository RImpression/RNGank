'use strict';
import React,{Component,PropTypes} from 'react';
import {
    View,
    StatusBar,
    BackAndroid,
    Platform
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MainNav from './MainNav';
import { Provider } from 'react-redux';
import configureStore from './stores';
import ToastUtils from './utils/ToastUtils';
let  window = global || window;
window.Common = require('./config/Common');

const store = configureStore();

class App extends Component {
    static childContextTypes = {
        addBackButtonListener: React.PropTypes.func,
        removeBackButtonListener: React.PropTypes.func,
    };
    constructor(props) {
        super(props);

        this.backButtonListeners = ([]: Array<() => boolean>);
        this.onBack = this._onBack.bind(this);
        this.addBackButtonListener = this._addBackButtonListener.bind(this);
        this.removeBackButtonListener = this._removeBackButtonListener.bind(this);
    }

    getChildContext() {
        return {
            addBackButtonListener: this.addBackButtonListener,
            removeBackButtonListener: this.removeBackButtonListener,
        };
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBack);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBack);
    }

    renderScene(route, navigator) {
        let Component = route.component;
        return <Component {...route.params} navigator={navigator}/>
    }
    render() {
        return(
            <Provider store={store}>
                <Navigator
                    ref={component => this.navigator = component}
                    initialRoute={{component: MainNav}}
                    renderScene={(route, navigator)=>this.renderScene(route, navigator)}
                />
            </Provider>
            )
    }

    _addBackButtonListener(listener) {
        this.backButtonListeners.push(listener);
    }

    _removeBackButtonListener(listener) {
        this.backButtonListeners = this.backButtonListeners.filter((handler) => handler !== listener);
    }

    _onBack() {
        // 判断是否有子组件需要消耗返回键事件
        for (let i = this.backButtonListeners.length - 1; i >= 0; i--) {
            if (this.backButtonListeners[i]()) return true;
        }

        let navigator = this.navigator;

        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }

        let curTimestamp = new Date().getTime();

        // 判断3秒内两次按返回键才真正退出APP
        if (this.extTimestamp !== undefined && curTimestamp - this.extTimestamp <= 3000) {
            // 真正退出
            return false;
        } else {
            ToastUtils.showToast('再按一次退出APP');
            this.extTimestamp = curTimestamp;
            return true;
        }
    }
}
export default App;
