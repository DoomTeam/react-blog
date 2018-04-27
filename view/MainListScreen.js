import React, {Component} from 'react';
import {Text, View, SectionList, StyleSheet,Image,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import {inject, observer} from 'mobx-react/native'

//论坛分类列表页
@inject('store')
@observer
export default class MainList extends Component {
    static navigationOptions = ({navigation, props}) => {
        const params = navigation.state.params || 'default';
        return {
            title: params.title ? params.title : '帖子推荐',
            headerLeft: (<Icon transparent
                               onPress={() => {
                                   navigation.navigate('DrawerToggle');
                               }}
                               name={"navicon"}
                               style={{color: '#fff', paddingLeft: 15}} size={20}>
            </Icon>),
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            forum: this.props.store.selectedForum
        }
    }

    componentWillMount() {
        this.setState({forum: this.props.store.selectedForum});
        this.props.navigation.setParams({title: (this.props.store.selectedForum.name || '')})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.params.forum) {
            this.setState({forum: this.props.store.selectedForum});
        }
    }

    _onClick(item){
        this.props.store.selectSubForum(item);
        this.props.navigation.navigate('FormList')
    }

    _renderItem=({item})=>{
        return(
            <TouchableOpacity style={styles.item} onPress={this._onClick.bind(this,item)}>
                <Image source={{uri:item.logo}}style={{width:85,height:85,marginRight:15}}></Image>
                <View style={{justifyContent:'space-between',height:85}}>
                    <Text style={{ fontSize: 15,color:'#333'}}>{item.name}</Text>
                    <Text style={{ fontSize: 13,color:'#aaa',}}>{item.phone}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    checkAdult(data) {
        return data!=null;
    }

    render() {
        const {forum} = this.state
        if(forum.sub){
            let length=forum.sub.length;
            for(let a in forum.sub) {
                a.data.filter(this.checkAdult)
            }
        }
        const sections = [];

        for (let i=0;i<10;i++) {
            let datas = [];
            for (let j = 0; j < 10; j++) {
                datas.push(
                    {
                        name: '用户' + i + j,
                        phone: '01234567890',

                    }
                );
            }
            sections.push({key:i,data:datas,name:i});
        }

        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5', padding: 15, justifyContent: 'center',}}>
                <SectionList
                    sections={forum.sub}
                    renderItem={this._renderItem}
                    renderSectionHeader={({section}) => <Text
                        style={styles.sectionHeader}>{section.name}</Text>}
                    keyExtractor={(item,index)=>("index"+index+item)}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        color:'#32CD32',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        height: 100,
        flexDirection: 'row',
        alignItems:'center'
    },
})