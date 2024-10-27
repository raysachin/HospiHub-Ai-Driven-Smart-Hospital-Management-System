from flask import Flask,request,jsonify
import numpy as np
import pickle
import os

file_name = "diabetes_model.pkl"
directory = "model"
file_path = os.path.join(directory, file_name)

# Load the model using the full file path
with open(file_path, 'rb') as file:
    model = pickle.load(file)
# model = pickle.load(open('linear_model.pkl','rb'))


app = Flask(__name__)

@app.route('/')
def index():
    return "Hello world"


# temperature = float('temperature')
# humidity = float('humidity')
# dew_point = float('dew_point')
# precipitation = float('precipitation')

@app.route('/predict',methods=['POST'])
def predict():
    temperature1 = request.form.get('temperature')
    humidity1 = request.form.get('humidity')
    dew_point1 = request.form.get('dew_point')
    precipitation1 = request.form.get('precipitation')

    temperature = float(temperature1)
    humidity = float(humidity1)
    dew_point = float(dew_point1)
    precipitation = float(precipitation1)

    input_query = np.array([[temperature, humidity, dew_point, precipitation]])
    # Convert input data to numeric types

    # result = {'temperature': temperature, 'humidity': humidity, 'dew_point': dew_point, 'precipitation': precipitation}
    # result = model.predict(input_query)[0]

    result = model.predict(input_query)[0]
    # return jsonify(result)
    return jsonify({'generation':int(result)})

if __name__ == '__main__':
    app.run(debug=True)

# /home/sachin2021/mysite/flask_app.py