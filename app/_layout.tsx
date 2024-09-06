//require('dotenv').config();
//import Config from 'react-native-config';
//console.log(Config); // Powinno pokazać wszystkie zmienne środowiskowe


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import axios from 'axios';

export default function RootLayout() {
  const colorScheme = useColorScheme();  // Użycie motywu kolorystycznego
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [inputText, setInputText] = useState(''); // Tekst wpisany przez użytkownika
  const [responseText, setResponseText] = useState(''); // Odpowiedź z API

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Funkcja do wysyłania zapytania do API OpenAI
  const sendToOpenAI = async () => {
    const apiKey = 'TU WPISZ API KOD';
    const prompt = inputText;
    console.log('API Key:', apiKey);


    try {
      const response = await axios.post(
  'https://api.openai.com/v1/chat/completions',
  {
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: inputText }], // Zamiast 'prompt', używamy 'messages'
    max_tokens: 10000,
  },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,  // Wstaw tutaj swój klucz API
    },
  }
);

    console.log(response.data);  // Loguj całą odpowiedź z API

      // Aktualizacja stanu odpowiedzi
      setResponseText(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Błąd podczas wysyłania zapytania:', error);
      Alert.alert('Błąd', 'Coś poszło nie tak podczas wysyłania zapytania do OpenAI.');
    }
  };

  if (!loaded) {
    return null; // Czekamy na załadowanie czcionek
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Wpisz swoje pytanie:</Text>
        <TextInput
          style={{
            height: 40,
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
            marginBottom: 20,
          }}
          placeholder="Wpisz pytanie..."
          onChangeText={text => setInputText(text)} // Aktualizacja stanu z tekstem
        />
        <Button title="Wyślij do OpenAI" onPress={sendToOpenAI} />

        <Text style={{ marginTop: 20, fontSize: 16 }}>Odpowiedź z OpenAI:</Text>
        <Text style={{ marginTop: 10, padding: 10, backgroundColor: '#f0f0f0', width: '80%' }}>
          {responseText}  {/* Wyświetlamy odpowiedź z OpenAI */}
        </Text>

        <View style={{ marginTop: 20 }}>
          <Text>Witaj w mojej aplikacji!</Text>
          <Button
            title="Kliknij mnie"
            onPress={() => Alert.alert('Powiadomienie', 'Przycisk został kliknięty!')}
          />
        </View>
      </ScrollView>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}