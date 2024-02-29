import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
function Main({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
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

export default Main;
