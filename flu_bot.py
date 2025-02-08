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


