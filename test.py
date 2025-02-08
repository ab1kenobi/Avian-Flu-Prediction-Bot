import joblib 
import pandas as py

model = joblib.load('Flu_bot.pkl')

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

# Example input coordinates
latitude = 37.7714
longitude = -81.2487

# Get the outbreak prediction
outbreak_chance = predict(latitude, longitude)
print(f"The likelihood of an outbreak at lat: {latitude}, lon: {longitude} is {outbreak_chance}.")

