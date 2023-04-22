import json
from lambda_function import lambda_handler
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)
print('loading keys')

print('setting mode to local')
os.environ['MODE'] = 'local'

event = {
    'body': json.dumps({
        'query': 'is this video good for experts?',
        'video_id': 'NIG8lXk0ULg'
    })
}

response = lambda_handler(event, None)

print(response)
