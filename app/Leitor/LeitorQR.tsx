import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function LeitorQR() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  // Pede permissão da câmera ao abrir a tela
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Quando o QR é lido
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);

    Alert.alert(
      "Confirmação",
      "Você deseja marcar sua presença (entrar) ou saída (sair) do ônibus?",
      [
        {
          text: "Embarcar",
          onPress: () => console.log("Embarque confirmado com QR:", data),
        },
        {
          text: "Desembarcar",
          onPress: () => console.log("Desembarque confirmado com QR:", data),
        },
      ],
      { cancelable: false }
    );
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />

      {/* Para permitir escanear novamente depois de ler */}
      {scanned && (
        <Text
          onPress={() => setScanned(false)}
          style={{ textAlign: "center", padding: 16, backgroundColor: "#eee" }}
        >
          Tocar para escanear novamente
        </Text>
      )}
    </View>
  );
}
