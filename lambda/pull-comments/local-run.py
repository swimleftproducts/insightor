from lambda_function import lambda_handler
from time import perf_counter
import pprint

event = {
    'queryStringParameters':{
        'videoid':'dIUTsFT2MeQ',
        'maxcomments': '100'
    }
}

start = perf_counter()
pprint.pprint(lambda_handler(event, {}))
end = perf_counter()

print('Requests took: ',end-start,' s')