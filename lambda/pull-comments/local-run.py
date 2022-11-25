from lambda_function import lambda_handler
from time import perf_counter
import pprint
import json

event = {
    'queryStringParameters':{
        'videoid':'QeaWIgOt-yU',
        'maxcomments': 20
    }
}

start = perf_counter()
response = lambda_handler(event, {})

body= json.loads(response['body'])
pprint.pprint(body['comments'])
# print(json.load(type(body)))
# pprint.pprint(body)
end = perf_counter()

print('Requests took: ',end-start,' s')