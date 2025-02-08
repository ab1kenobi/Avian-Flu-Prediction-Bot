from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib

# Set up app
app = Flask(__name__)




CORS(app, resources={r"/*": {"origins" : "*"}})  # Enable CORS for all routes

# Read the datasets
data1 = pd.read_csv('avg_temp.csv')
data2 = pd.read_csv('final.csv')

# Merge the datasets
merged_data = pd.merge(data1, data2)

# Extract relevant features
merged_data['latitude'] = merged_data['lat']
merged_data['longitude'] = merged_data['lng']
merged_data['avg_temp'] = merged_data['avg.temp']

# Load the pre-trained model (ensure you have this file saved)
model = joblib.load('Flu_bot_final.pkl')

# Function to find the closest latitude and longitude
def find_closest_lat_long(latitude, longitude, data):
    # Calculate the Euclidean distance between the input lat/long and each point in the dataset
    distances = np.sqrt((data['latitude'] - latitude)**2 + (data['longitude'] - longitude)**2)
    closest_index = distances.idxmin()  # Find the index of the closest point
    return data.iloc[closest_index]  # Return the row with the closest lat/long

# Prediction function
def predict(latitude, longitude):
    # Find the closest match in the dataset
    closest_data = find_closest_lat_long(latitude, longitude, merged_data)
    
    # Extract the infection history (cases)
    cases = closest_data['cases']
    
    # Classify based on whether there were any cases in the past
    if cases > 0:
        outbreak_chance = "High"
    else:
        outbreak_chance = "Low"
    
    return outbreak_chance

# Define recommendations
low_rec = """Here are three key preventive measures for a farm owner to help protect poultry from avian flu:

1. **Implement Biosecurity Measures:** Restrict access to your farm to essential personnel, provide clean clothing and footwear for anyone entering poultry areas, and disinfect vehicles and equipment regularly to minimize the risk of contamination.

2. **Limit Contact with Wild Birds:** Keep poultry indoors or in enclosed areas to avoid interaction with wild birds, particularly waterfowl, which are common carriers of the avian flu virus.

3. **Monitor Poultry Health and Report Illness:** Regularly check your flock for signs of illness such as sudden death or respiratory issues. If any suspicious symptoms appear, immediately report them to local agricultural authorities."""

high_rec = """please follow these steps immediately:

1. **Strict Biosecurity:** Limit access to your farm, disinfect everything regularly, and ensure anyone entering changes clothes and footwear before entering poultry areas.

2. **Restrict Movement of Birds:** Avoid selling or moving birds, especially during high-risk periods. If movement is necessary, follow strict protocols for safe transport, and quarantine any new birds for at least 30 days before introducing them to your flock.

3. **Protect Your Family:** Minimize direct contact with sick or dead birds, wash hands frequently, and monitor for flu-like symptoms in family members."""

@app.route('/predict', methods=['POST'])
def getPredict():
    data = request.get_json()
    latitude = data['latitude']
    longitude = data['longitude']
    # Get the outbreak prediction
    outbreak_chance = predict(latitude, longitude)
    recommendation = high_rec if outbreak_chance == "High" else low_rec

    return jsonify({
        'outbreak_chance': outbreak_chance,
        'recommendation': recommendation
    })

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response 

if __name__ == '__main__':
    app.run(debug=True)
