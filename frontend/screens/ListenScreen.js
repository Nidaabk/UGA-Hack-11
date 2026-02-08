import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from "expo-av";

const BACKEND_URL = "http://172.21.210.67:3001";

export default function ListenScreen({ navigation }) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState("English");
  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState("");

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      setIsPlaying(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      sendAudioToBackend(uri);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const sendAudioToBackend = async (uri) => {
    const formData = new FormData();

    formData.append("audio", {
      uri,
      name: "speech.webm",
      type: "audio/webm",
    });

    formData.append("langName", language.toLowerCase());

    try {
      const response = await fetch(`${BACKEND_URL}/stt`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const text = await response.text();

      if (!response.ok) {
        console.error("STT backend error:", text);
        return;
      }

    const data = JSON.parse(text);
    setTranscript(data.transcript);
    } catch (err) {
      console.error("STT error:", err);
    }
  };

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
          onPress={() => {
            if (!isPlaying) {
              startRecording();
            } else {
              stopRecording();
            }
          }}
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
          {transcript || "..."}
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
