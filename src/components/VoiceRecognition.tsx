import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Voice, { SpeechResultsEvent } from '@react-native-community/voice';

// Define the type of the event with optional value
type ExtendedSpeechResultsEvent = {
  value?: string[]; // value might be undefined
};

const VoiceRecognition: React.FC = () => {
  const [recognizedText, setRecognizedText] = useState<string>('');

  Voice.onSpeechResults = (event: SpeechResultsEvent) => {
    // Type guard to ensure event.value is defined and has at least one element
    const results = (event as ExtendedSpeechResultsEvent).value;
    if (results && results.length > 0) {
      setRecognizedText(results[0]);
    } else {
      // Handle the case where results are not available or empty
      setRecognizedText('No speech recognized');
    }
  };

  const startRecognition = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Start Recognition" onPress={startRecognition} />
      <Text>Recognized Text: {recognizedText}</Text>
    </View>
  );
};

export default VoiceRecognition;
