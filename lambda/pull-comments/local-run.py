from lambda_function import lambda_handler
import pprint

event = {
    'queryStringParameters':{
        'videoid':'QMuXV1giBP8'
    }
}
pprint.pprint(lambda_handler(event, {}))