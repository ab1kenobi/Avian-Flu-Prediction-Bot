import joblib 
import pandas as py

model = joblib.load('Flu_bot_final.pkl')

def predict(latitude, longitude, avg_temp):
    input_data = py.DataFrame([[latitude, longitude, avg_temp]], columns=['latitude', 'longitude', 'avg.temp'])
    prediction_prob = model.predict_proba(input_data)[0][1]
    return prediction_prob

latitude = 37.7714
longitude = -81.2487
avg_temp = 51.4

prediction_prob = (1-predict(latitude, longitude, avg_temp))
print(f'The likelihood of an outbreak is {prediction_prob:.2f}')

