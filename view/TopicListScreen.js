import React,{Component} from 'react'
import {FlatList,Text,View, StyleSheet,TouchableOpacity} from 'react-native'

import {inject, observer} from "mobx-react/native";
import Icon from 'react-native-vector-icons/FontAwesome';

import {StackNavigator} from 'react-navigation';
import EmptyView from './EmptyComponent'

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
        if(!this.state.tid)this.setState({loading: true});
        this.props.store.fetchTopicList(this.props.store.selectedSubForum, this.state.tid)
            .then((results) => {
                this.setState({loading: false});
                this.setState({waiting: false});
                if(!this.state.tid){
                    this.state.topics.splice(0,this.state.topics.length - 1);
                    this.setState({topics:results.result.data});
                } else {
                    //注意，concat方法是创建一个列表副本，然后将其赋值
                    this.setState({topics:this.state.topics.concat(results.result.data || [])})
                }
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

    _onRefresh(){
        this.setState({tid:null},()=>{
            this.loadTopics()
        })
        this.setState({loading:true})
    }

    _onLoadMore(){
        this.setState({waiting:true})
        this.loadTopics()
    }

    renderFooter=()=>{
        if(this.state.waiting){
            return(<Text style={{flex:1,height:20,justifyContent:'center'}}>加载中^^^</Text>)
        }else {
            return(<Text>...</Text>)
        }
    }

    componentWillMount() {
        this.loadTopics();
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.topics}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}//用于为给定的item生成一个不重复的key
                    style={{marginTop:15}}

                    refreshing={this.state.loading}
                    ListEmptyComponent={
                        <EmptyView
                            emptyData='暂无内容'
                            height={500}
                        />
                    }
                    onRefresh={()=>this._onRefresh()}
                    onEndReached={()=>this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.renderFooter}
                />
            </View>)
    }

    _pressItem(topic){
        this.props.store.selectTopic(topic);
        this.props.navigation.navigate('Details');
    }

    _renderItem=({item})=>{
        return(
            <TouchableOpacity style={styles.listItem} onPress={this._pressItem.bind(this,item)}>
                <Text style={styles.titleStyle}>{item.title}</Text>
                <View style={styles.bottomView}>
                    <Text>{item.time}</Text>
                    <Text>评论{item.replies}个</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item) => item.tid + '';

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