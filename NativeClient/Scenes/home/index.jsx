import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableHighlight,
} from 'react-native';
import {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
function LoginPage({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        <View style={[styles.FlexBox]}>
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
            onChangeText={newText => {
              setEmail(newText);
            }}
            defaultValue={email}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={[
              styles.InputBox,
              {borderColor: `${isDarkMode ? Colors.lighter : Colors.darker}`},
            ]}
            onChangeText={newText => {
              setPassword(newText);
            }}
            defaultValue={password}
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

export default LoginPage;
