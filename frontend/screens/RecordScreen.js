import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecordScreen({ navigation }) {

  const [isRecording, setIsRecording] = useState(false);
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

        {/* Language Selector - Now Toggleable */}
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


      {/* Main Camera Placeholder Card */}
      <View style={styles.cameraCard}>

        {/* Camera Preview Area (Ready for real camera later) */}
        <View style={styles.cameraPlaceholder}>
        </View>

        {/* Record / Stop Toggle Button */}
        <TouchableOpacity
          style={styles.recordButton}
          onPress={() => setIsRecording(!isRecording)}
        >
          <Image
            source={
              isRecording
                ? require('../assets/images/stop.png')
                : require('../assets/images/play.png')
            }
            style={styles.playIcon}
          />
        </TouchableOpacity>

      </View>

      {/* Transcription Output Box */}
      <View style={styles.textOutputCard}>
        <Text style={styles.placeholderText}>
          {language === "English"
            ? "Waiting for sign..."
            : "Esperando seña..."}
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

  cameraCard: {
    width: '90%',
    height: 420,
    backgroundColor: '#E8E8EB',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  cameraPlaceholder: {
    width: '85%',
    height: 280,
    backgroundColor: '#F3F3F5',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  recordButton: {
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
    height: 100,
    backgroundColor: '#a2a2a4',
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
