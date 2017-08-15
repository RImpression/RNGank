import React, {Component,PropTypes} from 'react';
import {View,Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

/**
 * 左部返回键
 * leftButtom={<NavBarBackItem {...props}/>}
 */
export class NavBarBackItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <TouchableOpacity onPress={()=>{
                 this.props.navigator.pop();
            }}>
                <Image
                    style={backItemStyles.back_icon}
                    source={require('../../images/icon_back.png')}/>
            </TouchableOpacity>
        )
    }
}
const backItemStyles = StyleSheet.create({
    item_view:{
        width:25,
        height:25,
        marginLeft:12,
        backgroundColor:'#FF0000'
    },
    back_icon:{
        width:25,
        height:25,
        resizeMode:'contain'
    }
});

/**
 * 右部菜单键
 * label 菜单名
 * icon 图标
 * clickAction 点击监听
 * isIcon 是否显示图标
 * rightButton={<NavBarRightItem
                label="保存"
                icon={require('../../images/member_welfare.press.png')}
                clickAction={()=>{console.log('you click')}}
                {...this.props}/>}
 */
export class NavBarRightItem extends Component {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        clickAction:PropTypes.func,
        title:PropTypes.any
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.title == nextProps.title
            && this.props.touchAction == nextProps.touchAction) {
            return false;
        }
        return true;
    }
    render() {
        let content;
        if (!this.props.isIcon) {
            content = (
                <TouchableOpacity onPress={this.props.clickAction&&this.props.clickAction()}>
                    <View style={rightItemStyles.item_view}>
                        <Text style={rightItemStyles.text}>{this.props.label}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            content = (
                <TouchableOpacity onPress={this.props.clickAction&&this.props.clickAction}>
                    <View style={rightItemStyles.item_view}>
                        <Image style={rightItemStyles.image_view}
                                source={this.props.icon}/>
                    </View>
                </TouchableOpacity>
            )
        }
        return(
            <View>
                {content}
            </View>
        )
    }
}
const rightItemStyles = StyleSheet.create({
    item_view:{
        width:55,
        height:25,
        marginRight:9,
        alignItems:'flex-end',
        justifyContent:'center'
    },
    text:{
        fontSize:14,
        color:'#FFFFFF'
    },
    image_view:{
        width:25,
        height:25,
        resizeMode:'contain'
    }
});