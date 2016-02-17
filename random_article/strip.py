#!/usr/bin/env python
import json

# Edit the json file
with open('../../aggregated-data.json', 'r') as json_file:
	data = json.load(json_file)
	for element in data:
		text = element["article"]["text"]
		title = element["article"]["title"]
		shooter_gender = "unknown"
		if element["shooter-details"]:
			shooter_gender = element["shooter-details"][0]["gender"]
		del element["article"]
		del element["shooter-details"]
		del element["shooting-details"]
		del element["victim-details"]
		element["title"] = title
		element["text"] = text
		if shooter_gender == "":
			shooter_gender = "unknown"
		element["gender"] = shooter_gender

with open('../../article-text3.json', 'w') as new_file:
	json.dump(data, new_file)

# View the data you've just written 
with open('../../article-text3.json', 'r') as data_file:    
    data = json.load(data_file)

print json.dumps(data, indent=4, sort_keys=True)