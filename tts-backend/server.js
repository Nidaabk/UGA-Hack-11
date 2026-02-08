import express from "express";
import textToSpeech from "@google-cloud/text-to-speech";
import speech from "@google-cloud/speech";
import { TranslationServiceClient } from "@google-cloud/translate";
import multer from "multer";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

const ttsClient = new textToSpeech.TextToSpeechClient({
  keyFilename: process.env.GOOGLE_MULBERRY_CREDENTIALS,
});

const translateClient = new TranslationServiceClient({
  keyFilename: process.env.GOOGLE_MULBERRY_CREDENTIALS,
});

const sttClient = new speech.SpeechClient({
  keyFilename: process.env.GOOGLE_STT_CREDENTIALS,
});
const upload = multer();

const LANG = {
  english: { stt: "en-US", tts: "en-US", translate: "en" },
  spanish: { stt: "es-ES", tts: "es-ES", translate: "es" },
  turkish: { stt: "tr-TR", tts: "tr-TR", translate: "tr" },
  hindi: { stt: "hi-IN", tts: "hi-IN", translate: "hi" },
};

function getLang(langName = "english") {
  const key = String(langName).toLowerCase();
  return LANG[key] || LANG.english;
}
const PROJECT_ID = "mulberry-486705";
const LOCATION = "global";

// text to audio file
app.post("/tts", async (req, res) => {
  try {
    const { text, langName = "english" } = req.body;
    const lang = getLang(langName);

    if (!text || typeof text !== "string") {
      return res.status(400).send("Missing or invalid 'text'");
    }

    const [response] = await ttsClient.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: lang.tts,
        ssmlGender: "NEUTRAL",
      },
      audioConfig: { audioEncoding: "MP3" },
    });

    res.set("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Text-to-Speech failed");
  }
});

// audio file to text, accepts multipart/form-data with "audio" field and optional "langName" field
app.post("/stt", upload.single("audio"), async (req, res) => {
  try {
    // Keep langName parsing (even if not required) so the API stays compatible
    const { langName = "english" } = req.body;
    void langName;

    if (!req.file) {
      return res.status(400).send("No audio file uploaded");
    }

    const audioBytes = req.file.buffer.toString("base64");
    const request = {
      audio: { content: audioBytes },
      config: {
        encoding: "WEBM_OPUS",
        sampleRateHertz: 48000,
        // Primary language + alternatives: lets it recognize English or Spanish automatically
        languageCode: "en-US",
        alternativeLanguageCodes: ["es-ES"],
      },
    };

    const [response] = await sttClient.recognize(request);
    const transcript =
      response.results
        ?.map((r) => r.alternatives?.[0]?.transcript)
        .join(" ") || "";

    res.json({ transcript, langUsed: "en-US|es-ES" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Speech-to-Text failed");
  }
});

// translates text from source language to target language
app.post("/translate", async (req, res) => {
  try {
    const { text, targetLangName = "english", sourceLangName } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).send("Missing or invalid 'text'");
    }

    const target = getLang(targetLangName).translate; // "es", "tr", "hi", "en"
    const source = sourceLangName ? getLang(sourceLangName).translate : undefined;

    const parent = `projects/${PROJECT_ID}/locations/${LOCATION}`;

    const [response] = await translateClient.translateText({
      parent,
      contents: [text],
      mimeType: "text/plain",
      targetLanguageCode: target,
      ...(source ? { sourceLanguageCode: source } : {}),
    });

    const translatedText = response.translations?.[0]?.translatedText || "";

    res.json({
      translatedText,
      targetLanguageCode: target,
      sourceLanguageCode: source || null,
    });
  } catch (error) {
    console.error(error);
    console.error("TRANSLATE ERROR:", error?.message);
    console.error("DETAILS:", error?.details);
    console.error("CODE:", error?.code);
    res.status(500).send("Translate failed");
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
