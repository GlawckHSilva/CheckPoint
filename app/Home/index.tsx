import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './style'; 
import * as Font from 'expo-font';


export default function Index() {
  const [fontsLoaded] = Font.useFonts({
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Carregando...</Text>;
  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo {'\n'}ao CheckPoint
      </Text>

      <Text style={styles.subtitle}>
        Ajudando você a <Text style={{color: '#F35C22'}}>automatizar{'\n'} </Text>sua <Text style={{color: '#F35C22'}}>viagem </Text> e sua <Text style={{color: '#F35C22'}}>presença</Text>!
      </Text>

      <Image
        source={require('../../assets/images/Home.png')} 
        style={styles.image}
      />

      <View style={styles.buttomTop }>
        <Link href="/LoginAluno" style={styles.linkStudent}>Login Aluno</Link>
      </View>
      
      
      <View style={styles.buttomButtom }>
        <Link href="/LoginSecretaria" style={styles.link}>Login Secretaria</Link>
        <Link href="/LoginMotorista" style={styles.link}>Login Motorista</Link>
      </View>
      
    </View>
  );
}