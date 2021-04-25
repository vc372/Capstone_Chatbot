# import the necessary packages
from imutils import face_utils
import numpy as np
import argparse
import imutils
import dlib
import cv2

from PIL import ImageOps
from PIL import Image

from torchvision.transforms import ToTensor
import torch
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torchvision import models
from torchvision import datasets, models, transforms

def shape_to_np(shape, dtype="int"):
	# initialize the list of (x, y)-coordinates
	coords = np.zeros((68, 2), dtype=dtype)
	# loop over the 68 facial landmarks and convert them
	# to a 2-tuple of (x, y)-coordinates
	for i in range(0, 68):
		coords[i] = (shape.part(i).x, shape.part(i).y)
	# return the list of (x, y)-coordinates
	return coords

def rect_to_bb(rect):
	# take a bounding predicted by dlib and convert it
	# to the format (x, y, w, h) as we would normally do
	# with OpenCV
	x = rect.left()
	y = rect.top()
	w = rect.right() - x
	h = rect.bottom() - y
	# return a tuple of (x, y, w, h)
	return (x, y, w, h)

def dlib_face_detection(image_path, detector, predictor):
    # load the input image, resize it, and convert it to grayscale
    image = cv2.imread(image_path)
    image = imutils.resize(image, width=500)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # detect faces in the grayscale image
    rects = detector(gray, 1)
    # loop over the face detections
    detect_bool = False
    for (i, rect) in enumerate(rects):
      detect_bool = True
      # determine the facial landmarks for the face region, then
      # convert the facial landmark (x, y)-coordinates to a NumPy
      # array
      shape = predictor(gray, rect)
      shape = face_utils.shape_to_np(shape)
      # convert dlib's rectangle to a OpenCV-style bounding box
      # [i.e., (x, y, w, h)], then draw the face bounding box
      (x, y, w, h) = face_utils.rect_to_bb(rect)
      if x < 0:
        x = 0
      if y < 0:
        y = 0
      cropped_image = image[y:y+h, x:x+w]
      return cropped_image, "True"
    return cv2.imread(image_path), "False"
    cv2.waitKey(0)

def get_model():
  #device = torch.device('cuda')  # use gpu device
  model = models.resnet18(pretrained=True)
  #model = model.to(device)

  # Number of classes in the dataset
  num_classes = 3

  # Update network to handle different number of output classes
  #resnet 50 = 2048
  #resnet18 = 512
  model.fc = torch.nn.Linear(512, num_classes)

  # Create an optimizer to update weights of the network
  params_to_update = model.parameters()
  optimizer = optim.SGD(params_to_update, lr=0.001, momentum=0.9)

  criterion = torch.nn.CrossEntropyLoss()
  model.conv1 = torch.nn.Conv2d(1, 64, kernel_size=7, stride=1, padding=3,bias=False)
  #model.to(device)

  
  #update this path to local path ***
  model.load_state_dict(torch.load('Resources/fer/saved_weights_grayscale_3classes_18.pth', map_location=torch.device('cpu')))

  model_local_path = "Resources/fer/model.pth"
  torch.save(model, model_local_path)

def get_detection_classifier():
    # initialize dlib's face detector (HOG-based) and then create
    # the facial landmark predictor
    detect_bool = False

    #update to local path ***
    path_to_facial_landmark_detector = "Resources/fer/shape_predictor_68_face_landmarks.dat"
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor(path_to_facial_landmark_detector)

    return detector, predictor

def classify_image(image_path, model_local_path, detector, predictor):
  
  model = torch.load(model_local_path)

  emotions = ["happy", "sad", "neutral"]

  image, detection = dlib_face_detection(image_path, detector, predictor)

  image = Image.fromarray(image, 'RGB')
  image.thumbnail((48,48))
  image = ImageOps.grayscale(image)
  image = ToTensor()(image).unsqueeze(0)
  #image = image.to(device)

  model.eval()
  prediction = model(image)
  _,tensor = torch.max(prediction, 1)
  print("Detection: " + str(detection))
  print("FACIAL EMOTION: " + str(emotions[tensor]))
  #with open("Resources/label.txt", "w") as fh:
   #   fh.write(str(emotions[tensor]))
  return emotions[tensor], str(detection)