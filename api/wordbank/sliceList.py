import sys
import json

with open('jsonList.json', encoding='utf8') as f:
    data = json.load(f)

print (data[500])
print ("done")