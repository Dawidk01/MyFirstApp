import whisper

# Załaduj model
model = whisper.load_model("base")  # Możesz zmienić na 'small', 'medium', 'large'

# Przetwórz plik audio
result = model.transcribe("C:/Users/dawid/MyFirstApp/backend/Nagrywanie3.m4a")  # Wstaw tutaj ścieżkę do pliku audio

# Wyświetl wynik transkrypcji
print(result['text'])