from flask import Flask 
from flask import request
# from gensim.models import KeyedVectors
import gensim.downloader as api
import numpy as np
import json
import data_processing
import nltk
import facial_recognition
import nlp_prediction
import pickle 
import torch
import load_nn_model
import time
app = Flask(__name__)

def anything(input):
  return input

@app.before_first_request
def init_resources():
	print('loading resources..')
	# app.wv = KeyedVectors.load('Resources/Pre_Trained_Word_Vectors/glove.wordvectors', mmap='r')
	# nltk.download('stopwords')
	# nltk.download('punkt')
	# nltk.download('wordnet')
	# nltk.download('averaged_perceptron_tagger')
	startTime = time.time()
	app.wv = api.load('glove-twitter-25')

	app.general_embedding = np.load('Resources/Embedding_Matrices/general_intents_embedding.npy')
	app.relationship_embedding = np.load('Resources/Embedding_Matrices/relationship_embedding.npy')
	app.friendship_embedding = np.load('Resources/Embedding_Matrices/friendship_embedding.npy')

	app.general_labels = np.load('Resources/Intent_Labels/general_intent_labels.npy')
	app.relationship_labels = np.load('Resources/Intent_Labels/relationship_labels.npy')
	app.friendship_labels = np.load('Resources/Intent_Labels/friendship_labels.npy')

	detector, predictor = facial_recognition.get_detection_classifier()
	facial_recognition.get_model()

	model_path = 'Resources/NLP_Resources/nn_model.pt'
	state_dict_path = 'Resources/NLP_Resources/state_dict_model.pt'
	vectorizer_path = 'Resources/NLP_Resources/vectorizer_new.pickle'
	app.model, app.vectorizer = load_nn_model.load_model(model_path, state_dict_path, vectorizer_path)
	print(f'Took {time.time()-startTime}s to Load Resources')

@app.route('/process_message', methods=['GET'])
def message_api():	
	message = request.args.get('message')
	predicted_label = data_processing.generate_response([message], app.wv, app.general_embedding, app.general_labels, 25)
	return {'Message_Label': str(predicted_label)}

@app.route('/process_image', methods=['POST'])
def image_api():
	img_data = request.data
	img_data = json.loads(img_data)['image']
	data_processing.save_image(img_data)
	detector, predictor = facial_recognition.get_detection_classifier()
	label, detection = facial_recognition.classify_image('Resources/screenshot.png', 'Resources/fer/model.pth', detector, predictor)
	return {'Image_label': str(label), 'Detection': str(detection)}

@app.route('/determine_problem_type', methods=['GET'])
def problem_api():
	message = request.args.get('message')
	predicted_label = nlp_prediction.predict_with_model(message, app.model, app.vectorizer)
	return {'Message_Label': str(predicted_label)}

# @app.route('/determine_relationship_type', methods=['GET'])
# def relationship_api():
# 	message = request.args.get('message')
# 	predicted_label = data_processing.generate_response([message], app.wv, app.relationship_embedding, app.relationship_labels, 25)
# 	return {'Message_Label': str(predicted_label)}

@app.route('/determine_relationship_subtopic', methods=['GET'])
def friendship_api():
	message = request.args.get('message')
	predicted_label = data_processing.generate_response([message], app.wv, app.friendship_embedding, app.friendship_labels, 25)
	return {'Message_Label': str(predicted_label)}

