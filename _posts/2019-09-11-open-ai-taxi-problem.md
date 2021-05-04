---
layout: posts
title:  "Open AI - Taxi Reinforcement Learning Notebook"
tags:   [open ai, reinforcement learning, machine learning, AI]
classes: wide
---

A notebook detailing how to work through the Open AI taxi reinforcement learning problem written in Python 3. [Source for environment documentation](https://gym.openai.com/envs/Taxi-v2/). 

```python
import gym

env = gym.make("Taxi-v3").env

env.render()
```
    
![open_ai_1](https://raw.githubusercontent.com/casey-barr/casey-barr.github.io/master/images/open_ai_1.png)

```python
env.reset() # reset environment to a new, random state
env.render()

print("Action Space {}".format(env.action_space))
print("State Space {}".format(env.observation_space))
```

![open_ai_2](https://raw.githubusercontent.com/casey-barr/casey-barr.github.io/master/images/open_ai_2.png)
    
    Action Space Discrete(6)
    State Space Discrete(500)
    

## Solve enviroment without reinforcement


```python
env.s = 328  # set environment to illustration's state

epochs = 0
penalties, reward = 0, 0

frames = [] # for animation

done = False

while not done:
    action = env.action_space.sample()
    state, reward, done, info = env.step(action)

    if reward == -10:
        penalties += 1
    
    # Put each rendered frame into dict for animation
    frames.append({
        'frame': env.render(mode='ansi'),
        'state': state,
        'action': action,
        'reward': reward
        }
    )

    epochs += 1
    
    
print("Timesteps taken: {}".format(epochs))
print("Penalties incurred: {}".format(penalties))
```

    Timesteps taken: 157
    Penalties incurred: 52
    


```python
from IPython.display import clear_output
from time import sleep

def print_frames(frames):
    for i, frame in enumerate(frames):
        clear_output(wait=True)
        print(frame['frame'])
        print(f"Timestep: {i + 1}")
        print(f"State: {frame['state']}")
        print(f"Action: {frame['action']}")
        print(f"Reward: {frame['reward']}")
        sleep(.1)
        
print_frames(frames)
```

![open_ai_gif](https://raw.githubusercontent.com/casey-barr/casey-barr.github.io/master/images/ipython_frames.gif)  


## Using Q-learning to train via reinforcement 

```python
import numpy as np

q_table = np.zeros([env.observation_space.n, env.action_space.n])
```


```python
%%time
"""Training the agent"""

import random
from IPython.display import clear_output

# Hyperparameters
alpha = 0.1
gamma = 0.6
epsilon = 0.1

# For plotting metrics
all_epochs = []
all_penalties = []

for i in range(1, 100001):
    state = env.reset()

    epochs, penalties, reward, = 0, 0, 0
    done = False
    
    while not done:
        if random.uniform(0, 1) < epsilon:
            action = env.action_space.sample() # Explore action space
        else:
            action = np.argmax(q_table[state]) # Exploit learned values

        next_state, reward, done, info = env.step(action) 
        
        old_value = q_table[state, action]
        next_max = np.max(q_table[next_state])
        
        new_value = (1 - alpha) * old_value + alpha * (reward + gamma * next_max)
        q_table[state, action] = new_value

        if reward == -10:
            penalties += 1

        state = next_state
        epochs += 1
        
    if i % 100 == 0:
        clear_output(wait=True)
        print(f"Episode: {i}")

print("Training finished.\n")
```

    Episode: 85600
    

## Evaluate agent


```python
"""Evaluate agent's performance after Q-learning"""

total_epochs, total_penalties = 0, 0
episodes = 100

for _ in range(episodes):
    state = env.reset()
    epochs, penalties, reward = 0, 0, 0
    
    done = False
    
    while not done:
        action = np.argmax(q_table[state])
        state, reward, done, info = env.step(action)

        if reward == -10:
            penalties += 1

        epochs += 1

    total_penalties += penalties
    total_epochs += epochs

print(f"Results after {episodes} episodes:")
print(f"Average timesteps per episode: {total_epochs / episodes}")
print(f"Average penalties per episode: {total_penalties / episodes}")
```

    Results after 100 episodes:
    Average timesteps per episode: 12.42
    Average penalties per episode: 0.0
    
Here is a link to a [Jupyter notebook](https://github.com/casey-barr/open-ai-taxi-problem/blob/master/open_ai_taxi_problem.ipynb) on my GitHub if you'd like to replicate the experiment.
