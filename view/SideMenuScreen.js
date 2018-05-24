import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {inject, observer} from 'mobx-react/native'; // inject表示调用缓存,observer表示当缓存数据生效时，刷新当前页面
import {NavigationActions} from 'react-navigation';

/**
 * 抽屉页面
 */
@inject('store')
@observer
export default class SideMenu extends Component {
    navigateToScreen(route, forum) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'MainListView',
            action: NavigationActions.navigate({routeName: route, params: {title: forum}}),
        });
        this.props.navigation.dispatch(navigateAction);
    }

    constructor(props) {
        super(props);
        state:{
            listData:[{ name:'帖子推荐'},];
            isLoaded:false;
        }
    }

    componentWillMount() {
        this.setState({isLoaded: true})
        this.props.store.fetchForums()
            .then((result) => {
                this.setState({isLoaded: false})
                result.unshift({name:'帖子推荐',fid:'-1'})//这个返回的结果是最终的数组长度，原数组会在头部插入一个数据
                this.setState({listData: result})
            })
    }

    _renderItem = ({item}) => {
        return (
            <Text style={styles.listItem} onPress={this._pressItem.bind(this, item)}>{item.name}</Text>
        )
    }

    _keyExtractor = (item) => item.fid + '';

    _pressItem(item) {
        this.props.store.selectForum(null);
        this.props.store.selectSubForum(null);
        if (item.name!='帖子推荐') {
            this.props.store.selectForum(item);
            this.navigateToScreen('List', item.name)
        } else {
            this.navigateToScreen('FormList', '帖子推荐')
        }
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <Image source={require('../img/bg_banner_dialog.jpg')} resizeMode={'cover'}
                       style={{height: 200}}></Image>
                <FlatList style={{paddingLeft: 15, paddingRight: 15}}
                          data={this.state.listData}
                          keyExtractor={this._keyExtractor}//用于为给定的item生成一个不重复的key
                          renderItem={this._renderItem}
                          refreshing={this.state.isLoaded}
                />
            </View>
        )
    }
}


var styles = StyleSheet.create({
    //容器
    container: {
        flex: 1,
    },
    listItem: {
        height: 40,
        textAlignVertical: 'center',
        fontSize: 15,
    }
})