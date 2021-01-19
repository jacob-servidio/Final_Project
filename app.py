import numpy as np
from flask import Flask, render_template,request, jsonify
import pickle
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import psycopg2


engine = create_engine("postgres+psycopg2://postgres:finalproject@database-final-project.ctvycruujmkn.us-east-2.rds.amazonaws.com/postgres")
#Initialize the flask App
app = Flask(__name__)
model = pickle.load(open('rfclassifier.pkl', 'rb'))

#default page of our web-app
@app.route('/')
def home():
    return render_template('index.html')

#To use the predict button in our web-app
@app.route('/predict',methods=['POST'])
def predict():
    #For rendering results on HTML GUI
    int_features = [float(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    prediction = model.predict(final_features)

    output = (prediction[0]) 
    return render_template('index.html', prediction_text='FDX quarterly Recommendation Key: Buy(1), Sell(0), Hold(2)    Recommendation:{}'.format(output))    

@app.route('/api/candle')
