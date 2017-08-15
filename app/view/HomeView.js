import React, {Component} from 'react';
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import NavigationBar from './common/NavigationBar';
import WebDetailView from './WebDetailView';

export default class HomeView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'推荐'}
                />
                <Text style={{fontSize:20}}>This is HomeView</Text>
                <TouchableOpacity onPress={()=>{
                    this.props.navigator.push({
                        component:WebDetailView,
                        params:{'hello world':1111},
                    });
                }}>
                    <Text>点击跳转</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
});