'use strict';
import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

export default class DailyContentView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {

        return(
            <ParallaxScrollView
                backgroundColor="blue"
                contentBackgroundColor="pink"
                parallaxHeaderHeight={300}
                stickyHeaderHeight={44}
                renderFixedHeader={() => {
                    return(
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                              <Text>Hello Dog!</Text>
                            </View>
                    )
                }}
                renderStickyHeader={() => {
                    return(
                        <View style={{ height: 44, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                              <Text>Hello World!</Text>
                            </View>
                    )
                }}
                renderForeground={() => (
                   <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Image style={{height:300,width:Common.size.width}}
                            source={{uri:'https://ws1.sinaimg.cn/large/610dc034ly1fiz4ar9pq8j20u010xtbk.jpg'}}
                            resizeMode='cover'/>
                    </View>
                  )}>
                <View style={{ height: 500 }}>
                    <Text>Scroll me</Text>
                </View>
            </ParallaxScrollView>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F2F2F7',
    },

});
