import json

taggers = {
    '1111':'eric',
    '2222':'karen',
    '3333':'travis',
    '4444':'SpaghetiHead',
    'xxxx':'anonymous'
}

def lambda_handler(event, context):
    user_pin = event['queryStringParameters']['user_pin']
    
    result = taggers.get(user_pin,None)
    
    return {
        'statusCode': 200,
        'body': json.dumps({'auth':result})
    }
