// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from '@expo/vector-icons/Ionicons';
//
// import HomeScreen from './screens/home';
// import ProfileScreen from './screens/profile';
// import MapScreen from './screens/map';
//
// const Tab = createBottomTabNavigator();
//
// function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//             tabBarIcon: ({ focused, color, size }) => {
//               let iconName;
//
//               if (route.name === 'Home') {
//                 iconName = focused
//                   ? 'ios-information-circle'
//                   : 'ios-information-circle';
//               } else if (route.name === 'Map') {
//                 iconName = focused
//                   ? 'ios-map'
//                   : 'ios-map';
//               } else if (route.name === 'Profile') {
//                 iconName = focused
//                 ? 'ios-person'
//                 : 'ios-person'
//               }
//
//               // You can return any component that you like here!
//               return <Ionicons name={iconName} size={size} color={color} />;
//             },
//           })}
//           tabBarOptions={{
//             activeTintColor: '#fb5b5a',
//             inactiveTintColor: '#003f5c',
//           }}
//         >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Map" component={MapScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
//
// export default App;

import React from 'react';
import {AppRegistry, View} from 'react-native';
import Routes from "./routes";

export default class App extends React.Component {
    render() {
        return(
            <Routes/>
        );
    }
}

AppRegistry.registerComponent('App', () => App);
