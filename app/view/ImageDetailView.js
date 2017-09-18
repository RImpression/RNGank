import React,{Component} from 'react';
import{
    View,
    BackAndroid,
    Dimensions,
    LayoutAnimation,
    Animated,
    Easing,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    StyleSheet,
    CameraRoll,
    Text
} from 'react-native';
import SaveImage from 'react-native-save-image';
import ToastUtils from '../utils/ToastUtils';
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
        SaveImage.setAlbumName('GankRim');
        SaveImage.setCompressQuality(80); // 整数品质
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

    /**
     * 保存图片至相册
     * CameraRoll在Android中只支持保存本地图片到相册，所以无法使用
     * @param url 图片地址
     */
    saveImage(url) {
        CameraRoll.saveToCameraRoll(url).then(function (success) {
                ToastUtils.showToast('妹子已成功躺入你的相册中啦....');
            }, function (error) {
                ToastUtils.showToast('保存妹子失败，请稍后再试...');
            }
        )
    }

    render() {
        return(
            <View style={{flex :1}}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={()=>this._onBackClick()}>
                        <Animated.Image style = {{height:this.state.h, width:this.state.w}} source = {{uri:this.image.url}}></Animated.Image>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity style={{width:30,height:30,position:'absolute',top:10+Common.statusHeight,right:10}}
                                  onPress={()=>{SaveImage.downloadImage(this.image.url,this.image.url)}}>
                    <Image style={{width:30,height:30}}
                           source={require('../../images/icon_save.png')}
                           resizeMode='cover'/>
                </TouchableOpacity>

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