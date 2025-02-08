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
merged_data['longitude'] = merged_data['lng']
merged_data['avg_temp'] = merged_data['avg.temp']

#relevant features
features = ['latitude', 'longitude', 'avg_temp']
X = merged_data[features]
Y = merged_data['cases']

#we now have to split the data set into training and testing data
#usually we use an 80 20 split which is what I believe we should do 
#we should add a random state to ensure that the results will be the same every time
X_train, X_test, Y_train, Y_test = train_test_split(X,Y,test_size=0.2, random_state=40)

#since we are predicting percentage, we should use a classifier instead of a regression model
clf = RandomForestClassifier(n_estimators=100, random_state=40)
#fitting the model and training it 
clf.fit(X_train, Y_train)
#this should print out the accuracy and precision of the testing data
print("Accuracy: ", accuracy_score(Y_test))
print(" ")
print("Precision: ", precision_score(Y_test))




