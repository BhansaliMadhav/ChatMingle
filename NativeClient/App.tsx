/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darkest : Colors.lightest,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={[
            styles.FlexBox,
            {backgroundColor: `isDarkMode ? Colors.darker : Colors.lighter`},
          ]}>
          <Text
            style={[
              {
                color: `${isDarkMode ? Colors.lighter : Colors.darker}`,
              },
              styles.Heading,
            ]}>
            Welcome to Chat Mingle
          </Text>
          <Text
            style={[
              {
                color: `${isDarkMode ? Colors.lighter : Colors.darker}`,
              },
              styles.SubHeading,
            ]}>
            Login To Start Using The App
          </Text>

          <TextInput
            placeholder="Email"
            style={[
              styles.InputBox,
              {borderColor: `${isDarkMode ? Colors.lighter : Colors.darker}`},
            ]}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={[
              styles.InputBox,
              {borderColor: `${isDarkMode ? Colors.lighter : Colors.darker}`},
            ]}
          />
        </View>
        <View style={styles.Flex}>
          <TouchableHighlight
            style={[
              styles.LoginButton,
              {
                backgroundColor: `${
                  isDarkMode ? Colors.lighter : Colors.darker
                }`,
              },
            ]}>
            <Text
              style={[
                {
                  color: `${isDarkMode ? Colors.darker : Colors.lighter}`,
                },
              ]}>
              Login
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  FlexBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  Flex: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  Heading: {
    fontSize: 24,
    marginTop: 100,
  },
  SubHeading: {
    fontSize: 16,
    marginBottom: 50,
  },
  InputBox: {
    borderRadius: 12,
    borderWidth: 2,
    width: 300,
    aspectRatio: 11 / 2,
    marginTop: 20,
    padding: 10,
  },
  LoginButton: {
    width: 100,
    aspectRatio: 3 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -20,
    borderRadius: 5,
  },
});

export default App;
