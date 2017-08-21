import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import Common from '../../config/Common';

export default class CardListCell extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.clickAction}>
                    <View style={styles.cell_view}>
                        <View style={{justifyContent:'center',alignItems: 'center'}}>
                            <Image
                                style={styles.image_view}
                                source={{uri:this.props.imgUrl}}
                                resizeMode='cover'/>
                            <Text style={styles.date_text}>{this.props.date}</Text>
                        </View>
                        <View style={styles.title_view}>
                            <Text style={styles.title_text}>{this.props.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:Common.size.width,
        padding:10,
        paddingBottom:0,
        justifyContent:'center',
        alignItems:'center'
    },
    cell_view:{
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'#95989A',
        elevation:5,
    },
    image_view:{
        width: Common.size.width-20,
        height:220,
        borderTopLeftRadius:5,
        borderTopLeftRadius:5
    },
    title_text:{
        fontSize:13,
        color:'#000000',
        lineHeight:20
    },
    title_view:{
        paddingVertical:14,
        paddingHorizontal:12,
    },
    date_text:{
        fontSize:16,
        color:'#FFFFFF',
        position:'absolute',
        right:10,
        bottom:10
    }
});