/**
 * 分类ListView item布局
 * desc 内容
 * type 分类
 * who  作者
 * publishedAt  发表时间
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import Common from '../../config/Common';

export default class SortListCell extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.clickAction}>
                    <View style={styles.cell_view}>
                        <View style={styles.content_view}>
                            <Text numberOfLines={3} style={styles.content_text}>{this.props.desc}</Text>
                        </View>
                        <View style={styles.bottom_view}>
                            <Text style={styles.type_text}>{this.props.type}</Text>
                            <Text style={styles.author_text}>author:  {this.props.who?this.props.who:'无'}</Text>
                            <Text style={styles.date_text}>{this.props.publishedAt}</Text>
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
        paddingVertical:10,
        paddingHorizontal:16
    },
    cell_view:{

    },
    content_view:{

    },
    bottom_view:{
        flexDirection:'row',
        paddingTop:8,
    },
    content_text:{
        fontSize:16,
        color:'#333333',
        lineHeight: 25,
    },
    author_text:{
        width:190,
        marginLeft:70,
        fontSize:14,
        color:'#95989a',
    },
    date_text:{
        fontSize:14,
        color:'#95989a'
    },
    type_text:{
        fontSize:14,
        color:'#95989a'
    }
});