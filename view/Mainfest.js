import {Platform} from "react-native";
import {StackNavigator} from 'react-navigation';

import MainList from "./MainListScreen";
import ForumDetail from "./InvitaDetailScreen";
import IconView from "./iconScreen";
import TopicListView from "./TopicListScreen";


export default StackNavigator({
        List: {screen: MainList,title:'列表'},
        Details: {screen: ForumDetail,title:'详情'},
        IconScreen:{screen:IconView,title:'icon'},
        FormList:{screen:TopicListView}
    },
    {
        initialRouteName: 'FormList',
        /* The header config from HomeScreen is now here */
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#32CD32',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            drawerLockMode: Platform.OS === 'ios' ? 'locked-closed' : 'unlocked'
        },
    }
);