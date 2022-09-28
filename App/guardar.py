import requests
import numpy as np

resp = requests.post("http://localhost:5000/api/RayosCosmicos", json={"lugar": "casa", "temperatura": 20*np.random.rand(), "saturacion":  20*np.random.rand(), "luz":  10*np.random.rand()})

print(resp.text)
