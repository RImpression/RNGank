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
        }
    }
}