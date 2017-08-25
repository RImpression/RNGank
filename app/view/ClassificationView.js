import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import NavigationBar from './common/NavigationBar';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import CellView from './CellCommonView';

export default class ClassificationView extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render() {

        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'分类'}
                />
                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                    tabBarInactiveTextColor='mintcream'
                    tabBarActiveTextColor='white'
                    ref="scrollableTabView"
                    tabBarBackgroundColor='#4c4c4c'
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                      tabStyle={{height: 39}}/>}>
                    <CellView tabLabel="Android" title="this is android" {...this.props}/>
                    <CellView tabLabel="iOS" title="this is ios" {...this.props}/>
                    <CellView tabLabel="前端" title="this is web" {...this.props}/>
                    <CellView tabLabel="瞎推荐" title="this is hot" {...this.props}/>
                    <CellView tabLabel="拓展资源" title="this is welfare" {...this.props}/>
                    <CellView tabLabel="休息视频" title="this is video" {...this.props}/>
                </ScrollableTabView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});