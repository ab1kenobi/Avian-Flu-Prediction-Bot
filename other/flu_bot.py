import pandas as py
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score
from sklearn.tree import export_text



# Read the datasets
data1 = py.read_csv('avg_temp.csv')
data2 = py.read_csv('h5n1_cdc.csv')

# Display first few rows of the datasets
print(data1.head())
print(data2.head())

# Merge the datasets
merged_data = py.merge(data1, data2)

# Save the merged data to a new CSV file
merged_data.to_csv('merged_data.csv', index=False)

# Display the first few rows of the merged data
print(merged_data.head())

# Extract relevant features
merged_data['latitude'] = merged_data['lat']
merged_data['longitude'] = merged_data['lng']
merged_data['avg_temp'] = merged_data['avg.temp']

# Relevant features
features = ['latitude', 'longitude', 'avg_temp']
X = merged_data[features]
Y = merged_data['cases']

# Split the data into training and testing data
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=40)

# Create and train the RandomForestClassifier model
clf = RandomForestClassifier(n_estimators=100, random_state=40)
clf.fit(X_train, Y_train)

# Make predictions
Y_pred = clf.predict(X_test)

# Print accuracy and precision
print("Accuracy: ", accuracy_score(Y_test, Y_pred))
print("Precision: ", precision_score(Y_test, Y_pred, average='weighted'))  # Handles multiclass cases

import joblib

# Save the model
joblib.dump(clf, 'Flu_bot.pkl')

# Print the tree structure

