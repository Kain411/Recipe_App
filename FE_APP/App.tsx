import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import AppLayout from './src/route/AppLayout';

const App = () => {
  
  useEffect(() => {
    StatusBar.setBackgroundColor('#ffffff')
    StatusBar.setBarStyle('dark-content')
  }, [])

  return (
    <View style={styles.app_container}>
      <AppLayout />
    </View>
  );
};

const styles = StyleSheet.create({
  app_container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
