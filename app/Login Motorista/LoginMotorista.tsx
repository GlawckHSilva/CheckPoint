import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../Login Aluno/StyleAluno";
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/AntDesign';
import { useRouter } from "expo-router";

export default function LoginAluno() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const [fontsLoaded] = Font.useFonts({
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  const validateEmail = (value: string) => {
    setEmail(value);
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      setEmailError('Email inválido.');
    } else {
      setEmailError('');
    }
  };

  const validateSenha = (value: string) => {
    setSenha(value);
    if (value.length < 4) {
      setSenhaError('Senha deve ter pelo menos 4 caracteres');
    } else {
      setSenhaError('');
    }
  };

  const handleLogin = () => {
    if (emailError || senhaError || !email || !senha) {
      Alert.alert("Erro", "Verifique os campos antes de continuar.");
    } else {
      // Aqui você pode validar no backend, se necessário
      router.push('/Leitor/LeitorQR'); // Caminho absoluto para evitar problemas
    }
  };

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, marginLeft: 20 }}>
        <Icon name="arrowleft" size={25} color="#F35C22" onPress={router.back} style={{ marginRight: 25 }} />
        <Text style={styles.title}>Login Motorista</Text>
      </View>

      <Image source={require('../../assets/images/Login.png')} style={styles.login} />

      {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={validateEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {senhaError ? <Text style={{ color: 'red' }}>{senhaError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={validateSenha}
        value={senha}
        placeholderTextColor="#fff"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={handleLogin}
        disabled={!!emailError || !!senhaError || !email || !senha} // Desabilitar botão se houver erro
      >
        <Text style={{ color: '#fff', fontSize: 20 }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}