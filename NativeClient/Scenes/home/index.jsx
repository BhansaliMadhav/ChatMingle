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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BASE_URL} from '@env';
function LoginPage({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  async function Login(email, password, navigation) {
    console.log('triggered login');
    console.log('URL', BASE_URL);
    console.log('email', email);
    console.log('password', password);
    console.log(
      'JSON',
      JSON.stringify({
        email: email,
        password: password,
      }),
    );
    try {
      const response = await fetch(BASE_URL + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.userId) {
        await AsyncStorage.setItem('userId', data.userId);
        await AsyncStorage.setItem('tokenCode', data.tokenCode);
        // alert("Login Successful");
        console.log('triggered success');
        navigation.navigate('Main');
      } else {
        console.log('triggered failure');
        alert(data.message);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  }

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
                color: `${isDarkMode ? Colors.lighter : Colors.lighter}`,
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
            onPress={() => Login(email, password, navigation)}
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
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={[
              styles.SignInText,
              {color: `${isDarkMode ? '#cccccc' : '#333333'}`},
            ]}>
            New User? Sign In
          </Text>
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
  SignInText: {
    marginLeft: -25,
    marginTop: 30,
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
