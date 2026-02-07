import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ListenScreen({ navigation }) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <View style={styles.container}>

      {/* Top Header Row */}
      <View style={styles.headerRow}>

        {/* App Title */}
        <Image
          source={require('../assets/images/appname.png')}
          style={styles.titleImage}
        />

        {/* Language Selector */}
        <TouchableOpacity
          style={styles.languageBox}
          onPress={() =>
            setLanguage(language === "English" ? "Spanish" : "English")
          }
        >
          <Text style={styles.languageText}>{language}</Text>
        </TouchableOpacity>

        {/* Home Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            source={require('../assets/images/home.jpeg')}
            style={styles.homeIcon}
          />
        </TouchableOpacity>

      </View>


      {/* Main Listen Card */}
      <View style={styles.listenArea}>

        {/* Large Microphone Icon Circle */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/microphone.png')}
            style={styles.micIcon}
          />
        </View>

        {/* Play / Stop Toggle Button */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Image
            source={
              isPlaying
                ? require('../assets/images/stop.png')
                : require('../assets/images/play.png')
            }
            style={styles.playIcon}
          />
        </TouchableOpacity>

      </View>


      {/* Text Output Box */}
      <View style={styles.textOutputCard}>
        <Text style={styles.placeholderText}>
          {language === "English"
            ? "..."
            : "..."}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1F2A38',
    paddingTop: 40,
    alignItems: 'center',
  },

  headerRow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  titleImage: {
    width: 160,
    height: 50,
    resizeMode: 'contain',
  },

  languageBox: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
  },

  languageText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  homeIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 15,
  },

  listenArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },


  iconContainer: {
    backgroundColor: 'white',
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  micIcon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    tintColor: '#6a2961',
  },

  playButton: {
    marginTop: 20,
    backgroundColor: '#6a2961',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: 'white',
  },

  textOutputCard: {
    width: '90%',
    height: 250,
    backgroundColor: '#E8E8EB',
    borderRadius: 20,
    marginTop: 15,
    padding: 15,
    justifyContent: 'center',
  },

  placeholderText: {
    fontSize: 18,
    color: '#555',
  },

});
