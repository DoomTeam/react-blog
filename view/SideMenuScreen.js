import React, {Component} from 'react';
import {Text,View,Image,StyleSheet,FlatList} from 'react-native';
import {inject, observer} from 'mobx-react/native';// inject表示调用缓存,observer表示当缓存数据生效时，刷新当前页面

import {NavigationActions} from 'react-navigation';
/**
 * 抽屉页面
 */
@inject('store')
@observer
export default class SideMenu extends Component{
    navigateToScreen (route, forum){
        const navigateAction = NavigationActions.navigate({
            routeName: route,
            action: NavigationActions.navigate({ routeName: 'List' , params:{title: forum}}),
        });
        this.props.navigation.dispatch(navigateAction);
    }

    constructor(props){
        super(props);
        state:{
            listData:null;
            isLoaded:false;
        }
    }

    componentWillMount() {
        this.setState({isLoaded:true})
        this.props.store.fetchForums()
            .then((result)=>{
                this.setState({isLoaded:false})
                this.setState({listData:result})
            })
    }

    _renderItem=({item})=>{
        return(
            <Text style={styles.listItem} onPress={this._pressItem.bind(this,item)}>{item.name}</Text>
        )
    }

    _keyExtractor = (item) => item.fid + '';

    _pressItem(item){
        if(item){
           this.navigateToScreen('MainListView',item.name)
        }else {
            this.navigateToScreen('TopicScreen','帖子推荐')
        }
    }

    render(){
        return(
            <View style={{flex:1,}}>
                <Image  source={require('../img/bg_banner_dialog.jpg')} resizeMode={'cover'} style={{height:200}}></Image>
                <Text style={styles.listItem} onPress={this._pressItem.bind(this,null)}>帖子推荐</Text>
                <FlatList style={{paddingLeft:15,paddingRight:15}}
                          data={this.state.listData}
                          keyExtractor={this._keyExtractor}//用于为给定的item生成一个不重复的key
                          renderItem={this._renderItem}
                          refreshing={this.state.isLoaded}
                />
            </View>
        )
    }
}


var styles=StyleSheet.create({
    //容器
    container:{
        flex:1,
    },
    listItem:{
        height:40,
        textAlignVertical:'center',
        fontSize:15
    }
})