import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import NavigationBar from './common/NavigationBar';
import {NavBarBackItem,NavBarRightItem} from './../compoments/NavBarItems';

export default class WebDetailView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.container}>
                <NavigationBar
                    leftButton={<NavBarBackItem {...this.props}/>}
                    title={'详情'}
                    rightButton={<NavBarRightItem
                                label="保存"
                                icon={require('../../images/member_welfare.press.png')}
                                clickAction={()=>{console.log('you click')}}
                                {...this.props}/>}
                />
                <Text style={{fontSize:20}}>This is WebDetailView</Text>
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