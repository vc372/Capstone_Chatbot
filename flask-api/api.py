from flask import Flask 
from flask import request
from gensim.models import KeyedVectors
import numpy as np
import json
import data_processing

app = Flask(__name__)

@app.before_first_request
def init_resources():
	print('loading resources')
	app.wv = KeyedVectors.load('Resources/Pre_Trained_Word_Vectors/glove.wordvectors', mmap='r')
	app.embedding_matrix = np.load('Resources/Embedding_Matrices/general_intents_embedding.npy')
	app.labels = np.load('Resources/Intent_Labels/general_intent_labels.npy')


@app.route('/process_message', methods=['GET'])
def message_api():	
	message = request.args.get('message')
	predicted_label = data_processing.generate_response([message], app.wv, app.embedding_matrix, app.labels)

	return {'Response_text': str(predicted_label)}

@app.route('/process_image', methods=['POST'])
def image_api():
	img_data = request.data
	img_data = json.loads(img_data)['image']
	data_processing.save_image(img_data)	
	return {'Image_label': 'Sent Back From Flask'}

	


