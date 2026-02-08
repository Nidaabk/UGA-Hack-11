import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function RecordScreen({ navigation }) {
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();

  const [isRecording, setIsRecording] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const [language, setLanguage] = useState("English");
  const [statusText, setStatusText] = useState("Loading camera...");
  const [videoUri, setVideoUri] = useState(null);

  // Ask for camera permission on load
  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) requestPermission();
  }, [permission]);

  // Reset "ready" status when screen mounts
  useEffect(() => {
    setCameraReady(false);
  }, []);

  // Update status when camera becomes ready
  useEffect(() => {
    if (cameraReady) {
      setStatusText(language === "English" ? "Ready to record" : "Listo para grabar");
    }
  }, [cameraReady, language]);

  const startRecording = async () => {
    try {
      if (!cameraRef.current) return;

      // Prevent "Camera is not ready yet" error
      if (!cameraReady) {
        setStatusText(language === "English" ? "Camera warming up..." : "Cámara iniciando...");
        return;
      }

      setIsRecording(true);
      setVideoUri(null);
      setStatusText(language === "English" ? "Recording..." : "Grabando...");

      const video = await cameraRef.current.recordAsync({
        quality: "720p",
        maxDuration: 60,
        mute: false,
      });

      // recordAsync resolves AFTER stopRecording() is called
      setVideoUri(video.uri);
      setStatusText(language === "English" ? "Saved ✅" : "Guardado ✅");
    } catch (e) {
      console.log("record error:", e);
      Alert.alert("Recording error", String(e?.message ?? e));
      setStatusText(language === "English" ? "Recording failed" : "Falló la grabación");
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    try {
      if (!cameraRef.current) return;
      setStatusText(language === "English" ? "Stopping..." : "Deteniendo...");
      cameraRef.current.stopRecording();
    } catch (e) {
      console.log("stop error:", e);
    }
  };

  // Permission loading state
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>
          {language === "English" ? "Loading permissions..." : "Cargando permisos..."}
        </Text>
      </View>
    );
  }

  // Permission denied state
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", marginBottom: 12 }}>
          {language === "English"
            ? "Camera permission is required."
            : "Se requiere permiso de cámara."}
        </Text>
        <TouchableOpacity style={styles.languageBox} onPress={requestPermission}>
          <Text style={styles.languageText}>
            {language === "English" ? "Grant Permission" : "Conceder permiso"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const buttonDisabled = !cameraReady && !isRecording;

  return (
    <View style={styles.container}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        {/* App Title */}
        <Image source={require("../assets/images/appname.png")} style={styles.titleImage} />

        {/* Language Selector */}
        <TouchableOpacity
          style={styles.languageBox}
          onPress={() => setLanguage(language === "English" ? "Spanish" : "English")}
        >
          <Text style={styles.languageText}>{language}</Text>
        </TouchableOpacity>

        {/* Home Button */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Home")}>
          <Image source={require("../assets/images/home.jpeg")} style={styles.homeIcon} />
        </TouchableOpacity>
      </View>

      {/* Main Camera Card */}
      <View style={styles.cameraCard}>
        <View style={styles.cameraPlaceholder}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="front"
            onCameraReady={() => setCameraReady(true)}
          />
        </View>

        {/* Record / Stop Toggle Button */}
        <TouchableOpacity
          style={[styles.recordButton, buttonDisabled ? { opacity: 0.5 } : null]}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={buttonDisabled}
        >
          <Image
            source={
              isRecording
                ? require("../assets/images/stop.png")
                : require("../assets/images/play.png")
            }
            style={styles.playIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Output Box */}
      <View style={styles.textOutputCard}>
        <Text style={styles.placeholderText}>{statusText}</Text>

        {videoUri ? (
          <Text style={{ marginTop: 6, fontSize: 12, color: "#444" }}>
            {language === "English" ? "Saved file:" : "Archivo guardado:"} {videoUri}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2A38",
    paddingTop: 40,
    alignItems: "center",
  },

  headerRow: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  titleImage: {
    width: 160,
    height: 50,
    resizeMode: "contain",
  },

  languageBox: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
  },

  languageText: {
    fontSize: 14,
    fontWeight: "bold",
  },

  homeIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 15,
  },

  cameraCard: {
    width: "90%",
    height: 420,
    backgroundColor: "#E8E8EB",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  cameraPlaceholder: {
    width: "85%",
    height: 280,
    backgroundColor: "#F3F3F5",
    borderRadius: 15,
    overflow: "hidden", // keeps rounded corners for camera feed
  },

  camera: {
    width: "100%",
    height: "100%",
  },

  recordButton: {
    marginTop: 20,
    backgroundColor: "#6a2961",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  playIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "white",
  },

  textOutputCard: {
    width: "90%",
    minHeight: 100,
    backgroundColor: "#a2a2a4",
    borderRadius: 20,
    marginTop: 15,
    padding: 15,
    justifyContent: "center",
  },

  placeholderText: {
    fontSize: 18,
    color: "#555",
  },
});
