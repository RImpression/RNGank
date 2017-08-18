'use strict';
import React,{Component,PropTypes} from 'react';
import {
    View,
    StatusBar
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MainNav from './MainNav';
import { Provider } from 'react-redux';
import configureStore from './stores';

const store = configureStore();

class App extends Component {
    renderScene(route, navigator) {
        let Component = route.component;
        return <Component {...route.params} navigator={navigator}/>
    }
    render() {
        console.log(7777,store);
        return(
            <Provider store={store}>
                <Navigator
                    initialRoute={{component: MainNav}}
                    renderScene={(route, navigator)=>this.renderScene(route, navigator)}
                />
            </Provider>
            )
    }
}
export default App;
