from lambda_function import lambda_handler
from time import perf_counter
import pprint
import json

event = {
   'body':{
    'videoID':'TGLrdDW_Dc4',
    'comment':'lots of long text',
    'label':'tutorial'
   }
}

start = perf_counter()
response = lambda_handler({'body':json.dumps(event['body'])}, {})
pprint.pprint(response)
end = perf_counter()

print('Requests took: ',end-start,' s')