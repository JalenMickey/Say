import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import LottieView from 'lottie-react-native'; // Import Lottie for animations
import { Audio } from 'expo-av'; // Import expo-av for playing sounds
import i18n from '../i18n';
import speechService from '../services/speechService';

const HotelScreen = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentStage, setCurrentStage] = useState(0); // Track the current conversation stage
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null); // Track positive/negative feedback
  const [speechLanguage, setSpeechLanguage] = useState('fr-FR'); // Speech language (e.g., French)
  const [sound, setSound] = useState<Audio.Sound | null>(null); // Track sound instance

  const conversationStages = [
    {
      message: 'welcome_message', // "Welcome to the hotel!"
      responses: [
        { text: i18n.t('response_1_hi'), correct: false },
        { text: i18n.t('response_2_bathroom'), correct: false },
        { text: i18n.t('response_3_age'), correct: false },
        { text: i18n.t('response_4_check_in'), correct: true } // Correct response
      ],
    },
    {
      message: 'hotel_reservation_question', // "Do you have a reservation?"
      responses: [
        { text: i18n.t('response_yes'), correct: true }, // Correct response
        { text: i18n.t('response_no'), correct: false },
        { text: i18n.t('response_what_reservation'), correct: false },
        { text: i18n.t('response_repeat_question'), correct: false },
      ],
    },
    // Add more stages as needed
  ];

  useEffect(() => {
    i18n.changeLanguage('en'); // Set the UI language to English for now
    startSpeaking(i18n.t(conversationStages[currentStage].message)); // Start speaking the first message
  }, [currentStage]);

  const handleResponse = async (isCorrect: boolean) => {
    if (isCorrect) {
      setFeedback('positive');
      await playSound(require('../assets/sounds/correct.wav')); // Play correct sound
      setTimeout(() => {
        setFeedback(null);
        goToNextStage();
      }, 2000); // Show positive feedback for 2 seconds before moving on
    } else {
      setFeedback('negative');
      await playSound(require('../assets/sounds/wrong.wav')); // Play wrong sound
      setTimeout(() => setFeedback(null), 2000); // Show negative feedback for 2 seconds
    }
  };

  const goToNextStage = () => {
    if (currentStage < conversationStages.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      // Conversation completed
      Alert.alert(i18n.t('conversation_complete'));
    }
  };

  const startSpeaking = (text: string) => {
    setIsSpeaking(true);
    speechService.translateAndSpeak(text, {
      language: speechLanguage,
      onDone: () => setIsSpeaking(false),
    });
  };

  const stopSpeaking = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  // Function to play sound
  const playSound = async (soundPath: any) => {
    if (sound) {
      await sound.unloadAsync(); // Unload previous sound instance if exists
    }
    const { sound: newSound } = await Audio.Sound.createAsync(soundPath);
    setSound(newSound);
    await newSound.playAsync();
  };

  // Cleanup sound on unmount
  useEffect(() => {
    const unloadSound = async () => {
      if (sound) {
        await sound.unloadAsync();
      }
    };
    return () => {
      unloadSound(); // Cleanup sound if the component is unmounted
    };
  }, [sound]);

  const currentConversation = conversationStages[currentStage];

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        {isSpeaking ? (
          <LottieView
            source={require('../assets/animations/characterTalking.json')} // Speaking animation
            autoPlay
            loop
            style={styles.animation}
          />
        ) : feedback === 'positive' ? (
          <LottieView
            source={require('../assets/animations/greenCheckmark.json')} // Positive feedback animation
            autoPlay
            loop={false}
            style={styles.animation}
          />
        ) : feedback === 'negative' ? (
          <LottieView
            source={require('../assets/animations/redx.json')} // Negative feedback animation
            autoPlay
            loop={false}
            style={styles.animation}
          />
        ) : (
          <LottieView
            source={require('../assets/animations/characterIdle.json')} // Idle animation when not speaking or giving feedback
            autoPlay
            loop
            style={styles.animation}
          />
        )}
      </View>

      <Text style={styles.text}>{i18n.t(currentConversation.message)}</Text>

      {currentConversation.responses.map((response, index) => (
        <Button
          key={index}
          title={response.text}
          onPress={() => handleResponse(response.correct)}
          disabled={feedback !== null || isSpeaking} // Disable buttons while showing feedback or while speaking
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  animationContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HotelScreen;
