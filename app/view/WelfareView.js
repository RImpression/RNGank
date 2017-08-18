import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from './common/NavigationBar';
import { fetchGankGirlData } from '../actions/GankApi';

class WelfareView extends Component {
    constructor(props) {
        super(props);
        this.curPageNo = 1;
    }

    componentDidMount() {
        this._fetchData(0);
    }

    /**
     * 加载妹纸列表数据
     */
    _fetchData(opt) {
        this.curPageNo = opt !== 2 ? 1 : (this.curPageNo + 1);
        this.props.dispatch(fetchGankGirlData(opt, this.curPageNo));
    }


    render() {
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'福利'}
                />
                <Text style={{fontSize:20}}>This is WelfareView</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

function select(store) {
    return {
        status: store.girlViewStore.status,
        dataSource: store.girlViewStore.dataSource,
        isRefreshing: store.girlViewStore.isRefreshing,
        isLoadMore: store.girlViewStore.isLoadMore,
        opt: store.girlViewStore.opt,
    }
}

export default connect(select)(WelfareView);