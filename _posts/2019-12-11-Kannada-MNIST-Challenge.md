---
layout: posts
title:  "Kannada MNIST Challenge"
classes: wide
tags:   [kaggle, AI, machine-learning, MNIST, neural-net, CNN, convolutional-neural-net, swish]
---

# Using a Convolutional Neural Net to Swish the Kannada MNIST Challenge


I recently entered the [Kannada MNIST Challenge](https://www.kaggle.com/c/Kannada-MNIST) on Kaggle, which is a computer vision problem based on a derivative of the [MNIST dataset](http://yann.lecun.com/exdb/mnist/) that is extremely popular in intro to machine learning tutorials.

Kannada is a language spoken predominantly by people of Karnataka in southwestern India. The language has roughly 45 million native speakers and is written using the Kannada script. The dataset is a collection of handwritten digits, like MNIST, with the goal of the competition being to design and train a model that accurately recognizes and classifies them accordingly.

This notebook will be a documentation of the model I made, using TensorFlow and Keras, with some insight into the custom activation function I decided to use in some of the layers called ['Swish'](https://arxiv.org/pdf/1710.05941.pdf). I originally ran this in a Kaggle notebook, but will leave a link to the code on my [GitHub](https://github.com/casey-barr/Kannada-MNIST-Challenge/blob/master/kannada-cnn-keras.ipynb).

________

To begin, I imported the standard Python packages `numpy` and `pandas`, and then `tensorflow` and checked that my notebook was connected to the GPU.

```python
import pandas as pd
import numpy as np

import tensorflow as tf
tf.test.gpu_device_name()
```
![gpu-check](https://raw.githubusercontent.com/casey-barr/casey-barr.github.io/master/images/kannada-images/gpu_check.png)

After the GPU connection is affirmed, I import the training and test data, extract the features and targets, and print the shapes of each.

```python
train_df = pd.read_csv("../input/Kannada-MNIST/train.csv")
test_df = pd.read_csv("../input/Kannada-MNIST/test.csv")


features = train_df.iloc[:,1:].values
targets = train_df.iloc[:,0].values
validation = test_df.iloc[:,1:].values

print("training images shape {}".format(features.shape))
print("training labels shape {}".format(targets.shape))
print("validation images shape {}".format(validation.shape))
```
![training_validation_shape](https://raw.githubusercontent.com/casey-barr/casey-barr.github.io/master/images/kannada-images/training_test_validation_dfs.png)

Next, I reshape the images into flattened vectors, and normalize the pixel values between 0 and 1.

```python
# reshape images

reshaped_features = features.reshape(features.shape[0], 28, 28, 1)
reshaped_validation = validation.reshape(validation.shape[0], 28, 28, 1)

print("x_flattened size {}".format(reshaped_features.shape))
print("val_flattened size {}".format(reshaped_validation.shape))

def normalize_data(df):
  df = df / 255.
  return df

normalized_features = normalize_data(reshaped_features)
normalized_validation = normalize_data(reshaped_validation)
```
![flattened_dfs](https://raw.githubusercontent.com/casey-barr/casey-barr.github.io/master/images/kannada-images/flattened.png)
_____

```python
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# train test split

X_train, X_test, y_train, y_test = train_test_split(normalized_features, targets, test_size=0.2, random_state=7)

# viz
plt.imshow(X_train[0][:,:,0])
```
![imshow](https://raw.githubusercontent.com/casey-barr/casey-barr.github.io/master/images/kannada-images/im_show.png)

Finally we get to building the model itself! I built a model in [TensorFlow](https://www.tensorflow.org/) using the [tf.keras](https://www.tensorflow.org/api_docs/python/tf/keras) API.

First I set the number of epochs, the batch size, and learning rate to be constants. Next up is defining the `Swish` activation function, which is ***f(x) = x * sigmoid(β * x)***. `Swish` was found by researchers to work better than ReLU on deeper models after an experiment in which they leveraed automatic search techniques to discover new activation functions. The [paper](https://arxiv.org/abs/1710.05941) they document this in was a really good read, and I recommend it.

For the model's architecture, however, I use a combination of [Conv2D](https://github.com/keras-team/keras/blob/master/keras/layers/convolutional.py#L361), [MaxPool2D](https://github.com/tensorflow/tensorflow/blob/r2.0/tensorflow/python/keras/layers/pooling.py#L282-L328), [Dropout](https://github.com/keras-team/keras/blob/master/keras/layers/core.py#L81), and [Flatten](https://github.com/keras-team/keras/blob/master/keras/layers/core.py#L462) layers to construct the model. For an optimizer, I chose [Adam](https://github.com/keras-team/keras/blob/master/keras/optimizers.py#L467) with the default parameters from its original paper, and have [sparse categorical crossentropy](https://keras.io/losses/) as my loss function, with [accuracy](https://keras.io/metrics/#accuracy) as the evaluation metric set by the competition.

```python
# Build CNN with Keras and the addition of Swish!

# Config
EPOCHS = 100
BATCH_SIZE = 32
LEARNING_RATE = 0.001

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPool2D

# add custom swish activation function
from tensorflow.keras.backend import sigmoid
def swish(x, beta = 1):
    return (x * sigmoid(beta * x))

from tensorflow.keras.layers import Activation
tf.keras.utils.get_custom_objects().update({'swish': Activation(swish)})

# Build model

model = Sequential()

# add layers
model.add(Conv2D(filters=64, kernel_size=(5, 5), padding='Same', activation='relu', input_shape=(28, 28, 1)))
model.add(Conv2D(filters=64, kernel_size=(5, 5), padding='Same', activation='swish', input_shape=(28, 28, 1)))
model.add(MaxPool2D(pool_size=(2,2)))
model.add(Dropout(0.25))

model.add(Conv2D(filters=32, kernel_size=(2, 2), padding='Same', activation='swish'))
model.add(Conv2D(filters=32, kernel_size=(2, 2), padding='Same', activation='swish'))
model.add(MaxPool2D(pool_size=(2, 2), strides=(2, 2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(256, activation='swish'))
model.add(Dropout(0.3))
model.add(Dense(10, activation='softmax'))

## optimizer
keras_optimizer = tf.keras.optimizers.Adam(lr=LEARNING_RATE)

# Compile model
model.compile(optimizer=keras_optimizer, loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.summary()
```
![model-summary](https://raw.githubusercontent.com/casey-barr/casey-barr.github.io/master/images/kannada-images/keras_model.png)
