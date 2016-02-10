#!/usr/bin/env python
import json

# Edit the json file
with open('../../aggregated-data.json', 'r') as json_file:
	data = json.load(json_file)
	for element in data:
		text = element["article"]["text"]
		title = element["article"]["title"]
		del element["article"]
		del element["shooter-details"]
		del element["shooting-details"]
		del element["victim-details"]
		element["title"] = title
		element["text"] = text

with open('../../article-text2.json', 'w') as new_file:
	json.dump(data, new_file)

# View the data you've just written 
with open('../../article-text2.json', 'r') as data_file:    
    data = json.load(data_file)

print json.dumps(data, indent=4, sort_keys=True)