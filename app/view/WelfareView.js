import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import NavigationBar from './common/NavigationBar';

export default class WelfareView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'福利'}
                />
                <Text style={{fontSize:20}}>This is WelfareView</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});