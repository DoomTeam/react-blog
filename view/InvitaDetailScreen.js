import React, { Component } from 'react';
import {
    ScrollView,
    Button,
    View,
    Text,
    StyleSheet,
    WebView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {inject, observer} from "mobx-react/native";

@inject('store')
@observer
export default  class ForumDetail extends Component {

    static navigationOptions = {
        title: 'vector-icons',
        headerBackTitle: 'back'
    };

    constructor(props){
        super(props)
        this.state={
            refurl: "http://bbs.mobileapi.hupu.com/1/7.0.8/threads/getThreadDetailInfoH5",
            loading: false,
            curPage: 1,
            totalPage: 1,
            topic: {}
        }
    }

    componentWillMount() {
        this.setState({ loading: true });
        this._loadTopic();
    }

    _loadTopic(){
        this.props.store.fetchTopicDetails(this.props.store.selectedTopic, this.state.curPage)
            .then((results) => {
                this.setState({ loading: false });
                this.setState({ totalPage: (results.pageSize || 1) });
                this.setState({ topic: (results || {})});
                this.props.navigation.setParams({title: (results.title || '')});
            });
    }

    render() {
        const items = [];
        items.push({name: 'facebook', title: 'Entypo'});
        items.push({name: 'facebook-f', title: 'EvilIcons'});
        items.push({name: 'twitter', title: 'FontAwesome', bgColor: '#0366d6'});
        items.push({name: 'github', title: 'Foundation', bgColor: '#0366d6'});
        items.push({name: 'google-plus', title: 'Ionicons'});
        items.push({name: 'code-fork', title: 'MaterialCommunityIcons', color: '#000', bgColor: 'gray'});
        items.push({name: 'apple', title: 'MaterialIcons', color: '#000', bgColor: 'gray'});
        items.push({name: 'windows', title: 'Octicons'});
        items.push({name: 'android', title: 'SimpleLineIcons'});
        items.push({name: 'linux', title: 'Zocial'});
        return (
            <View style={{flex:1}}>
                <WebView source={{uri: (this.state.topic.url), headers: {"Referer": this.state.refurl}}}
                         scalesPageToFit={false}
                         onLoadStart={(navState) => this.setState({url: navState.nativeEvent.url})}
                         onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                         javaScriptEnabled={true}
                         thirdPartyCookiesEnabled={true}
                         domStorageEnabled={true}
                         allowsInlineMediaPlayback={true}
                         mixedContentMode={'always'}
                />
                <Text style={styles.title}>1、按钮（跳转到图片库）</Text>
                {/*<Text style={styles.title}>1、按钮（跳转到图片库）</Text>*/}
                {/*{items.map((item, index) => {*/}
                    {/*return this._buttonIcon(item, index);*/}
                {/*})}*/}

                {/*<Text style={styles.title}>2、inline样式</Text>*/}
                {/*<Text style={{paddingHorizontal: 20}}>*/}
                    {/*传说中的inline<Icon name='android' color='#451234'/>*/}
                    {/*纯属测试<Icon name='apple'/>*/}
                    {/*呃呃呃*/}
                {/*</Text>*/}

            </View>
        );
    }

    _buttonIcon(data, index) {
        if (!data.bgColor)
            data.bgColor = '#3b5998';
        if (!data.color)
            data.color = '#fff';
        return (
            <View key={index} style={styles.btnView}>
                <Icon.Button
                    name={data.name}
                    backgroundColor={data.bgColor}
                    color={data.color}
                    onPress={() => {
                        this.props.navigation.navigate('IconScreen', {name: data.title});
                    }}>
                    {data.title}
                </Icon.Button>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    btnView: {
        paddingVertical: 3,
        alignSelf: 'center'
    },
    title: {
        paddingLeft: 10,
        marginVertical: 10,
    }
});