import json
import requests
import services
import analysis
import boto3

lambda_client = boto3.client('lambda')
session = requests.Session()

def lambda_handler(event, context):
    video_id = event['queryStringParameters']['videoid']
    max_comments = event['queryStringParameters'].get('maxcomments',400)
    
    pageToken = None
    comments = []
    words = []


    while True:
        if len(comments) >= int(max_comments):
            break
        
        response = services.makeYouTubeCall(session, video_id, pageToken=pageToken)

        if response.status_code != 200:
            return services.handle_error(response)
            
        body = response.json()
        services.getWordsAndComments(body, words, comments)

        if body.get('nextPageToken'):
            pageToken = body.get('nextPageToken')
        else:
            break
        if len(comments) >= int(max_comments):
            break
    
    analyzedComments = analysis.basicAnalysis(words,comments)
    
    #lambda_payload = {"comments":comments}
    # response_spacy = lambda_client.invoke(FunctionName='arn:aws:lambda:us-east-1:216068982475:function:testSpacy', 
    #                  InvocationType='RequestResponse',
    #                  Payload=json.dumps(lambda_payload))
    # analyzedComments = json.load(response_spacy['Payload'])['body']

    responseObject = {}
    responseObject['statusCode'] = 200
    responseObject['headers'] = {}
    responseObject['headers']['Content-type'] = 'application/json'
    responseObject['body'] = json.dumps(analyzedComments)

    return responseObject

