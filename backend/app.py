import os
import sys
import nltk
import random
import numpy as np
import json
import pickle
import tensorflow as tf
from nltk.stem import WordNetLemmatizer
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model

# Suppress TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppresses INFO & WARNING messages

# Set up file paths
if getattr(sys, 'frozen', False):  # Running as compiled executable
    BASE_DIR = sys._MEIPASS
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load resources
def load_file(file_name, mode="rb"):
    path = os.path.join(BASE_DIR, file_name)
    try:
        if mode == "rb":
            return pickle.load(open(path, mode))
        elif mode == "r":
            with open(path, mode) as f:
                return json.load(f)
    except Exception as e:
        print(f"Error loading {file_name}: {e}")
        sys.exit(1)

intents = load_file("intents.json", mode="r")
words = load_file("words.pkl")
classes = load_file("classes.pkl")

try:
    model = load_model(os.path.join(BASE_DIR, "chatbotmodel.h5"))
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
except Exception as e:
    print(f"Error loading model: {e}")
    sys.exit(1)

VOCAB_SIZE = len(words)
lemmatizer = WordNetLemmatizer()

# NLP Functions
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    return [lemmatizer.lemmatize(word.lower()) for word in sentence_words]

def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * VOCAB_SIZE
    for w in sentence_words:
        if w in words:
            idx = words.index(w)
            if idx < VOCAB_SIZE:
                bag[idx] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    results = [[i, r] for i, r in enumerate(res) if r > 0.10]  # ERROR_THRESHOLD
    if not results:
        return [{"intent": "unknown", "probability": "0"}]
    results.sort(key=lambda x: x[1], reverse=True)
    return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]

def get_response(intents_list):
    if not intents_list:
        return "I'm sorry, I don't understand. Could you rephrase?"
    highest_intent = max(intents_list, key=lambda x: float(x["probability"]))
    if float(highest_intent["probability"]) < 0.4:
        return "I'm not sure about that. Can you clarify?"
    tag = highest_intent["intent"]
    for i in intents["intents"]:
        if i["tag"] == tag:
            return random.choice(i["responses"])
    return "I'm not sure. Can you provide more details?"

def chat(user_input):
    ints = predict_class(user_input)
    return get_response(ints)

# Flask Web API
app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "MediMate Chatbot API is running!"})

@app.route("/chat", methods=["POST"])
def chatbot():
    data = request.get_json()
    if not data or "message" not in data:
        return jsonify({"error": "No message provided"}), 400
    user_message = data["message"]
    response = chat(user_message)
    return jsonify({"response": response})

if __name__ == "_main_":
    app.run(host="0.0.0.0", port=5000, debug=True)