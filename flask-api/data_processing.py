import re
import nltk
import base64
import numpy as np
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.metrics.pairwise import cosine_similarity

def save_image(img_data):
	with open("Resources/screenshot.png", "wb") as fh:
		fh.write(base64.b64decode(img_data[23:]))

def generate_response(query, wv, embedding_matrix, y):
	query = preprocess(query)
	print(query)
	vectorized_query = create_word_embeddings(query, wv)
	if(np.count_nonzero(vectorized_query) == 0):
		return "unrecognized"
	else:
		predicted_label = determine_highest_probability_label_cos_simul(vectorized_query, embedding_matrix, y)
		return predicted_label

def determine_highest_probability_label_cos_simul(vectorized_query, embedding_matrix, y):
	max_distance = 0
	output_label = ''
	for index in range(len(embedding_matrix)):
		training_vector = embedding_matrix[index]
		dist = cosine_similarity(vectorized_query.reshape(1,25), training_vector.reshape(1,25))
		print(dist, y[index])
		if dist > max_distance:
			max_distance = dist
			output_label = y[index]
	return output_label if max_distance > 0.6 else ":)" 

def create_word_embeddings(X_data, wv):
	X_data_word_vector = np.zeros((len(X_data), 25))

	for index in range(len(X_data)):
		current_phrase = X_data[index]
		collective_word_vector = np.zeros(25)
		for word in current_phrase:
			if word in wv.index_to_key:
				collective_word_vector = np.add(wv.get_vector(word), collective_word_vector)
		X_data_word_vector[index] = collective_word_vector
	return X_data_word_vector

def clean_document(doc):
	lemmatizer = WordNetLemmatizer()
	stopwords_list = stopwords.words('english')
	contains_letters_only = re.compile('^[a-z]+$')
	# (word not in stopwords_list) & 
	document = [lemmatizer.lemmatize(word.lower()) for word in doc if (bool(contains_letters_only.match(word.lower())) & bool(word.lower() not in stopwords_list))]
	return document

def preprocess(X_original):
	X_tokenized = [nltk.word_tokenize(word) for word in X_original]
	X_cleaned = [clean_document(word) for word in X_tokenized]
	return X_cleaned	
