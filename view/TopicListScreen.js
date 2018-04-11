import React,{Component} from 'react'
import {FlatList,Text,View, StyleSheet} from 'react-native'

import {inject, observer} from "mobx-react/native";
import Icon from 'react-native-vector-icons/FontAwesome';

import {StackNavigator} from 'react-navigation';

//帖子列表页
@inject('store')
@observer
export default class TopicListView extends Component{

    static navigationOptions = ({navigation, props}) => {
        const params = navigation.state.params || 'default';
        return {
            title: params.title ? params.title : '帖子推荐',
            headerLeft: (<Icon transparent
                               onPress={() => {navigation.navigate('DrawerToggle');}}
                               name={"navicon"}
                               style={{color: '#fff',paddingLeft:15}} size={20}>
            </Icon>),
        }
    };

    constructor(props){
        super(props);
        this.state={
            loading:false,
            tid: null,
            waiting:false,
            topics:[],
        }
    }

    loadTopics() {
        this.setState({loading: true});
        this.props.store.fetchTopicList(this.props.store.selectedSubForum, this.state.tid)
            .then((results) => {
                this.setState({loading: false});
                this.setState({waiting: false});
                this.setState({topics: this.state.topics.concat(results.result.data || [])});
                if (this.state.topics.length > 0) {
                    this.setState({tid: this.state.topics[this.state.topics.length - 1].tid});
                }
                if (this.props.store.selectedSubForum) {
                    this.props.navigation.setParams({showbtn: true});
                    this.props.navigation.setParams({title: (this.props.store.selectedSubForum.name || '')});
                } else {
                    this.props.navigation.setParams({showbtn: false});
                    this.props.navigation.setParams({title: '帖子推荐'});
                }
            })
            .catch((error) => {
                console.log("Error fetchTopicList ", error);
                this.setState({loading: false});
                this.setState({waiting: false});
            });
    }

    componentWillMount() {
        this.loadTopics();
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>{this.state.name}</Text>
                <FlatList
                    data={this.state.topics}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}//用于为给定的item生成一个不重复的key
                    style={{marginTop:15}}
                />
            </View>)
    }

    _renderItem=({item})=>{
        return(
            <View style={styles.listItem}>
                <Text style={styles.titleStyle}>{item.title}</Text>
                <View style={styles.bottomView}>
                    <Text>{item.time}</Text>
                    <Text>评论{item.replies}个</Text>
                </View>
            </View>
        )
    }

    _keyExtractor = (item) => item.id + '';

}

var styles=StyleSheet.create({
    //容器
    container:{
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    listItem:{
        height:80,
        marginLeft:15,
        marginRight:15,
        padding:10,
        marginBottom:15,
        backgroundColor:'white',
        justifyContent:'space-between',
    },
    titleStyle:{
        color:'#aaa',
        fontSize:13,
    },
    bottomView:{
        justifyContent:'space-between',
        flexDirection:'row'
    }
})

const ForumDetailStack = StackNavigator({
        List: { screen: TopicListView },
    },
    {
        initialRouteName: 'List',
        /* The header config from HomeScreen is now here */
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#32CD32',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },

        },
    }
);

module.exports = ForumDetailStack;