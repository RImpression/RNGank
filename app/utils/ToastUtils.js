/**
 * 吐司工具类
 */
import { AlertIOS, ToastAndroid, Platform } from 'react-native';
 export default class ToastUtils {
    static showToast = (msg) => {
        if (Platform.OS === 'android') {
            // Android
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            // iOS TODO 待实现
            //官方暂不支持Toast API，建议使用第三方开源库
        }
    }
}