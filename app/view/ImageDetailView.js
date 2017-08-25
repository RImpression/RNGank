import React,{Component} from 'react';
import{
    View,
    BackAndroid,
    Dimensions,
    LayoutAnimation,
    Animated,
    Easing,
    TouchableWithoutFeedback,
    Image,
    StyleSheet,
    Text
} from 'react-native';
class ImageDetailView extends Component {

    constructor(props) {
        super(props);
        this.image = props.image;
        this.state = {
            h : new Animated.Value(0.5),
            w : new Animated.Value(0.5)
        };
    }

    componentWillMount() {
        LayoutAnimation.spring();
    }
    componentDidMount(){
        Animated.timing(this.state.h, {
            toValue: height * 1,
            duration: 500,
            easing: Easing.linear
        }).start();
        Animated.timing(this.state.w, {
            toValue: width * 1,
            duration: 500,
            easing: Easing.linear
        }).start();

    }

    _onBackClick(){
        const {navigator} = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    render() {
        return(
            <View style={{flex :1}}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={()=>this._onBackClick()}>
                        <Animated.Image style = {{height:this.state.h, width:this.state.w}} source = {{uri:this.image.url}}></Animated.Image>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        );
    }
}
let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
});
export default ImageDetailView;