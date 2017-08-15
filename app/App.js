'use strict';
import React,{Component,PropTypes} from 'react';
import {
    View,
    StatusBar
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MainNav from './MainNav';
class App extends Component {
    renderScene(route, navigator) {
        let Component = route.component;
        return <Component {...route.params} navigator={navigator}/>
    }
    render() {
        return <Navigator
                        initialRoute={{component: MainNav}}
                        renderScene={(route, navigator)=>this.renderScene(route, navigator)}
                    />
    }
}
export default App;
