import React, {Component} from 'react';
import {Text,View,Image,StyleSheet,FlatList} from 'react-native';

export default class SideMenu extends Component{

    constructor(props){
        super(props);
        state:{
            listData:null;
            isLoaded:false;
        }
    }

    componentWillMount() {
        this.setState({isLoaded:true})
        this.setState({
            listData:[
                {key: 'Devin'},
                {key: 'Jackson'},
                {key: 'James'},
                {key: 'Joel'},
                {key: 'John'},
                {key: 'Jillian'},
                {key: 'Jimmy'},
                {key: 'Julie'},
                    ]
        })
    }

    render(){
        return(
            <View style={{flex:1,}}>
                <Image  source={require('../img/bg_banner_dialog.jpg')} resizeMode={'cover'} style={{height:200}}></Image>
                <Text>抽屉菜单</Text>
                <FlatList style={{paddingLeft:15,paddingRight:15}}
                          data={this.state.listData}
                          renderItem={({item})=> <Text>{item.key}</Text>}
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
})