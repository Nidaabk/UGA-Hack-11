# Mulberry – ASL Translator

Mulberry is an AI-powered application that recognizes American Sign Language (ASL) gestures and translates them into spoken and written language in real time. The project was developed for the 2026 UGA Hackathon to improve accessibility and communication.

---
## Team Members

- Elif Nida Abike  
- Devananda Sreekanth  
- Juan Ferreira  
- Alexia Nicole Martinez Medina  

---

## Project Overview

The Mulberry system uses a mobile camera to capture ASL gestures, processes them using a custom-built computer vision model, and converts the recognized signs into text and speech. Google Cloud APIs are integrated to support speech recognition, text-to-speech, and multilingual translation.

The goal of the project is to enhance communication between Deaf, hard-of-hearing, and hearing individuals.

---

## Features

- Real-time ASL gesture recognition  
- Text output from recognized signs  
- Speech synthesis for translated text  
- Two-way communication support  
- Multi-language translation  
- Mobile interface built with React Native  

---

## Technology Stack

### Frontend
- React Native  
- Expo  

### Backend
- Node.js  
- Google Cloud APIs  
  - Speech-to-Text  
  - Text-to-Speech  
  - Translation API  

### Computer Vision
- Custom deep learning model  
- PyTorch  
- Model inspired by Nicholas Renotte tutorials  
- Python environment managed with Astral UV  

---

## Setup and Running the Project

### Frontend (Mobile App)

Run the React Native application using Expo:
```bash
npx expo start
```
---

### Backend Server

Start the backend services for Google Cloud API communication:
```bash
node server.js
```

This backend server handles:

- Speech-to-text processing  
- Text-to-speech generation  
- Language translation services  

### Computer Vision Model

Run the ASL gesture recognition model using Astral UV:
```bash
uv sync
uv run src/integration_methods.py
python server.py
```
---

## Usage Flow

- Open the Mulberry mobile application  
- Enable the camera input module  
- Perform ASL gestures in front of the device  
- The system recognizes gestures in real time  
- Recognized text is displayed and converted to speech  

---

## Demonstrations

**Mobile App Demo:**  
https://youtube.com/shorts/Dj0n0KOpb4Q?feature=share  

**PC Computer Vision Model Demo:**  
https://youtu.be/28BC-gNJTTA  

---

## Future Improvements

- Expand vocabulary and gesture dataset  
- Improve real-time recognition accuracy  
- Add support for additional spoken languages  
- Implement reverse translation from speech to ASL animations  
- Integrate hardware options such as smart gloves

--

## External Resources
- Documentation - https://www.canva.com/design/DAHAqvPYPDg/GwiyBvjLmZjXx7p6nHnR3A/view?utm_content=DAHAqvPYPDg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd1440690fe
- Presentation - https://www.canva.com/design/DAHAsI4BJw0/ewaP65D3VPMRA1WawNT19Q/view?utm_content=DAHAsI4BJw0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd0ebb0decf
- Computer Vision Reference - https://github.com/nicknochnack/SignDETR
