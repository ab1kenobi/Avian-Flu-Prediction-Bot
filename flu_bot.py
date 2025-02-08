import pandas as py
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score

data1 = py.read_csv('avg_temp.csv')
data2 = py.read_csv('h5n1_cdc.csv')

print(data1.head())
print(data2.head())

merged_data = py.merge(data1, data2)
print(merged_data.head())

#we are using a RandomForestClassifier model which means that we will be building a tree
#this model builds a tree and based on the roots of the tree, it will make predictions
#in order to do this we first need to extract relevant features
#this model will be built on the avg.temp, the lat, the lon
#based on all of these features that we train it on, it should determine the likelihood of an outbreak
#step 1 is features
merged_data['latitude'] = merged_data['lat']
merged_data['longitude'] = merged_data['lon']
merged_data['avg_temp'] = merged_data['avg.temp']




