import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
function SignIn({navigation}) {
  const BASE_URL = process.env.BASE_URL;
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [display, setDisplay] = useState('none');
  const userId = AsyncStorage.getItem('userId');
  const toggleDisplay = () => {
    setDisplay(display === 'flex' ? 'none' : 'flex');
  };
  async function RecieveOtp(email, otp, navigation) {
    console.log('triggered login');
    console.log('URL', BASE_URL);
    try {
      const response = await fetch(BASE_URL + '/signIn/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
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
            Sign In Page
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
            placeholder="Otp"
            secureTextEntry
            // tvParallaxShiftDistanceX={100}
            style={[
              {
                borderColor: `${isDarkMode ? Colors.lighter : Colors.darker}`,
                display: `${display}`,
                paddingLeft: `${display === 'flex' ? 20 : undefined}`,
                borderRadius: 12,
                borderWidth: 2,
                width: 300,
                aspectRatio: 11 / 2,
                marginTop: 20,
              },
            ]}
            onChangeText={newText => {
              setOtp(newText);
            }}
            defaultValue={otp}
          />
        </View>
        <View style={styles.Flex}>
          <TouchableHighlight
            onPress={
              !otpSent
                ? () => {
                    setOtpSent(true);
                    if (display === 'none') {
                      toggleDisplay();
                    }
                  }
                : () => RecieveOtp(email, otp)
            }
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
              {otpSent ? 'Verify Otp' : 'Get Otp'}
            </Text>
          </TouchableHighlight>
          <Text
            onPress={() => navigation.navigate('LoginPage')}
            style={[
              styles.SignInText,
              {color: `${isDarkMode ? '#cccccc' : '#333333'}`},
            ]}>
            Already have an account ? Login
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

export default SignIn;
