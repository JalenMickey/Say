import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

// Props type definition
interface AnimatedCharacterProps {
  isSpeaking: boolean;  // Determines whether the character is speaking or idle
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({ isSpeaking }) => {
  const animationSource = isSpeaking 
    ? require('../assets/animations/characterTalking.lottie')  // Animation when speaking
    : require('../assets/animations/characterIdle.lottie');     // Animation when idle

  return (
    <View style={styles.container}>
      <LottieView
        source={animationSource}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,  // You can adjust this as needed
  },
  animation: {
    width: 250,  // Adjust size for your animation
    height: 250,
  },
});

export default AnimatedCharacter;
