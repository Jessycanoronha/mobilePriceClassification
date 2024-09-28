import joblib
import pandas as pd
from sklearn.svm import SVC
import numpy as np
class MobilePrice:
    def __init__(self):
        filename = './pipelines/mobile_price.pkl'
        with open(filename, 'rb') as file:
            self.model = joblib.load(file)

    def return_mobile(self, input_data):
      print(input_data)
      converted_input = {key: int(value) if isinstance(value, np.integer) else float(value) if isinstance(value, np.floating) else value for key, value in input_data.items()}

      y = pd.DataFrame([converted_input])
      model_result = self.model.predict(y)
      int_result = [int(x) for x in model_result]
      return int_result