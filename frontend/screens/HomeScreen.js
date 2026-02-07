import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {

  const [language, setLanguage] = useState("English");

  return (
    <View style={styles.container}>

      {/* Language Selector (Toggleable) */}
      <TouchableOpacity
        style={styles.languageBox}
        onPress={() =>
          setLanguage(language === "English" ? "Spanish" : "English")
        }
      >
        <Text style={styles.languageText}>{language}</Text>
      </TouchableOpacity>

      {/* Title Image instead of text */}
      <Image
        source={require('../assets/images/appname.png')}
        style={styles.titleImage}
      />

      {/* Main LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/LOGO.png')}
          style={styles.logo}
        />
      </View>

      {/* Record Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Record')}
      >
        <View style={styles.buttonRow}>
          <Image
            source={require('../assets/images/record.png')}
            style={styles.iconSmall}
          />
          <Text style={styles.buttonText}>
            {language === "English" ? "Record" : "Grabar"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Listen Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Listen')}
      >
        <View style={styles.buttonRow}>
          <Image
            source={require('../assets/images/microphone.png')}
            style={styles.iconSmall}
          />
          <Text style={styles.buttonText}>
            {language === "English" ? "Listen" : "Escuchar"}
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1F2A38',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },

  logoContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    padding: 10,
    borderRadius: 110,
  },

  languageBox: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },

  languageText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  titleImage: {
    width: 260,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  button: {
    backgroundColor: '#6a2961',
    padding: 15,
    borderRadius: 30,
    width: 230,
    alignItems: 'center',
    marginVertical: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },

  iconSmall: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

});
