import json
import services
import analysis

def lambda_handler(event, context):
    video_id = event['queryStringParameters']['videoid']
    max_comments = event['queryStringParameters']['maxcomments']
    
    pageToken = None
    comments = []
    words = []


    while True:
        if len(comments) >= int(max_comments):
            break
        
        response = services.makeYouTubeCall(video_id, pageToken=pageToken)

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
    
    data = analysis.basicAnalysis(words,comments)

    responseObject = {}
    responseObject['statusCode'] = 200
    responseObject['headers'] = {}
    responseObject['headers']['Content-type'] = 'application/json'
    responseObject['body'] = json.dumps(data)

    return responseObject

