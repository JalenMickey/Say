import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase'; // Adjust path if necessary
import { SignInScreenNavigationProp } from '../types/navigation';

const hamburgerIcon = require('../../assets/images/menu-icon.png');

const Header = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [menuVisible, setMenuVisible] = useState(false); // State to manage menu visibility

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate('SignIn'); // Redirect to sign-in or another screen
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.hamburger} onPress={toggleMenu}>
        <Image source={hamburgerIcon} style={styles.hamburgerImage} />
      </TouchableOpacity>
      {menuVisible && ( // Render the menu only if it's visible
        <View style={styles.menu}>
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={styles.menuItem}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  hamburger: {
    padding: 8,
    zIndex: 2, // Ensure hamburger icon is on top
  },
  hamburgerImage: {
    width: 24,
    height: 24,
  },
  menu: {
    position: 'absolute',
    right: 16,
    top: 100, // Adjust as needed
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 4, // Add shadow to the menu
    padding: 8,
    zIndex: 1, // Ensure menu is on top
  },
  menuItem: {
    padding: 8,
  },
});

export default Header;
