import React from 'react';
import LoginPage from './Scenes/home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './Scenes/main';
import SignIn from './Scenes/SignIn';
const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
