import requests
import json

url = "https://lnnqxaqalmxee46exnov3jupsa0srghv.lambda-url.us-east-1.on.aws/"

payload = json.dumps({
  "query": "what is should I do?",
  "video_id": "CfuhRVM1ntQ"
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
