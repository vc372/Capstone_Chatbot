import re
import nltk
import base64
import numpy as np
import heapq
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.metrics.pairwise import cosine_similarity

def save_image(img_data):
	with open("Resources/screenshot.png", "wb") as fh:
		fh.write(base64.b64decode(img_data[23:]))

def generate_response(query, wv, embedding_matrix, y, dim):
	query = noun_chunk_preprocess(query)
	print(query)
	vectorized_query = create_word_embeddings(query, wv, dim)
	if(np.count_nonzero(vectorized_query) == 0):
		return "unrecognized"
	else:
		predicted_label = knn(vectorized_query, embedding_matrix, y, 4)
		return predicted_label

# def determine_highest_probability_label_cos_simul(vectorized_query, embedding_matrix, y):
# 	max_distance = 0
# 	output_label = ''
# 	for index in range(len(embedding_matrix)):
# 		training_vector = embedding_matrix[index]
# 		dist = cosine_similarity(vectorized_query.reshape(1,25), training_vector.reshape(1,25))
# 		print(dist, y[index])
# 		if dist > max_distance:
# 			max_distance = dist
# 			output_label = y[index]
# 	return output_label if max_distance > 0.6 else ":)"

def l2(point1, point2):
    return np.sqrt(np.sum(np.power(np.subtract(point1, point2), 2)))

def knn(testInput, embedding_matrix, labels, k):
	result=[]
	max_heap_size = k
	heap = []
	heapq.heapify(heap)
	key = 0
	for index in range(len(embedding_matrix)):
		training_label = labels[index]
		training_vector = embedding_matrix[index]
		dist = cosine_similarity(testInput.reshape(1,-1), training_vector.reshape(1,-1))
		# dist = l2(testInput.reshape(1,-1), training_vector.reshape(1,-1))
		print(training_label, dist)
		heapq.heappush(heap, (dist[0][0], key, training_label))
		key = key + 1

		if(len(heap) > max_heap_size):
			heapq.heappop(heap)
	return tally_votes(heap)

def tally_votes(heap):
	votes = {}
	winning_label = ''
	largest_vote_quantity = 0
	# print(list(heap))

	while len(heap) > 0:
	    close_point = heapq.heappop(heap);
	    label = close_point[2]

	    if(label in votes.keys()):
	        votes[label] = votes[label] + 1
	    else:
	        votes[label] = 1

	for label in votes.keys():
	    number_of_votes = votes[label]
	    if(number_of_votes > largest_vote_quantity):
	        largest_vote_quantity = number_of_votes
	        winning_label = label

	return winning_label


def create_word_embeddings(X_data, wv, dim):
	X_data_word_vector = np.zeros((len(X_data), dim))

	for index in range(len(X_data)):
		current_phrase = X_data[index]
		collective_word_vector = np.zeros(dim)
		for word in current_phrase:
			print(word)
			if word in wv.index_to_key:
				collective_word_vector = np.add(wv.get_vector(word), collective_word_vector)

		if(not np.any(collective_word_vector)):
			collective_word_vector = np.ones(dim)
		print(collective_word_vector)
		X_data_word_vector[index] = collective_word_vector
	return X_data_word_vector

def clean_document(doc):
	lemmatizer = WordNetLemmatizer()
	stopwords_list = stopwords.words('english')
	contains_letters_only = re.compile('^[a-z]+$')
	# (word not in stopwords_list) & 
	document = [lemmatizer.lemmatize(word.lower()) for word in doc if (bool(contains_letters_only.match(word.lower())) & bool(word.lower() not in stopwords_list))]
	return document

def chunk(doc):
    noun_phrases = []
    # grammar = r"""NP: {<DT|PP\$>?<JJ.>*<NN|NNS>}"""
    grammar = r"""NP: {<VB.*>|<DT>?<JJ>*<NN>|<RB.*>}"""
    cp = nltk.RegexpParser(grammar)
    for sent in doc:
        chunked = cp.parse(sent)

        for subtree in chunked.subtrees(filter=lambda t: t.label() in "NP"):
            for word in subtree:
                noun_phrases.append(word[0])
    return noun_phrases

def preprocess(X_original):
	X_tokenized = [nltk.word_tokenize(word) for word in X_original]
	X_cleaned = [clean_document(word) for word in X_tokenized]
	return X_cleaned	

def noun_chunk_preprocess(X_original):
	X_tokenized = [nltk.word_tokenize(word) for word in X_original]
	X_tagged = [nltk.pos_tag(sent) for sent in X_tokenized]
	print(X_tagged)
	X_chunked = [chunk(X_tagged)]
	return X_chunked

