import requests
import json
import collections
import re
import os

def handle_error(responseObject, response):
    responseObject['statusCode'] = response.status_code
    responseObject['headers'] = {}
    responseObject['headers']['Content-type'] = 'application/json'
    responseObject['body'] = json.dumps({'message':'Error calling youtube'})

def lambda_handler(event, context):
    video_id = event['queryStringParameters']['videoid']
    API_KEY = os.environ['YOU_TUBE']
    URL = 'https://www.googleapis.com/youtube/v3/commentThreads'

    params = {
        'videoId':video_id,
        'key': API_KEY,
        'part':'snippet',
        'order':'relevance'
    }

    all_comments_pulled = False
    comments = []
    words = []

    while not all_comments_pulled:
        responseObject = {}
        response = requests.get(URL, params=params)

        if response.status_code != 200:
            handle_error(responseObject,response)
            all_comments_pulled = True
            return responseObject
            
        body = response.json()

        if not body.get('nextPageToken'):
            all_comments_pulled = True
        else:
            token = body.get('nextPageToken')
            params = {
                'videoId':video_id,
                'pageToken': token,
                'key': API_KEY,
                'part':'snippet',
                'order':'relevance'
            }

        items = body.get('items')
        
        for each in items:
            snippet = each.get('snippet')
            top_level_comment = snippet.get('topLevelComment')
            comment = top_level_comment['snippet']['textOriginal']
            comments.append(comment)
            comment_words = comment.split()
            words = comment_words + words

    #remove the stop words
    regex = re.compile('[^a-zA-Z]')
    common_words = ['the','be','to','of','and','a','in','that','have','i','it',
                    'for','not','on','with','he','as','you','do','at','this','but',
                    'his','by','from','they','we','say','or','an','will','']
    clean_words =[]
    long_words=[]
    really_long_words = []
    for each in words:
        each = each.lower()
        each = regex.sub('',each)
        if each in common_words:
            continue
        if len(each) > 7:
            really_long_words = really_long_words + [each]
            clean_words = clean_words + [each]
            continue  
        if len(each) > 5:
            long_words = long_words + [each]
            clean_words = clean_words + [each]
            continue
              
        clean_words = clean_words + [each]

    Counter = collections.Counter(clean_words)
    most_occur = Counter.most_common(6)

    data = {}
    data['comments'] = len(comments)
    data['most_occur'] = most_occur
    data['long_words'] = long_words
    data['really_long_words'] = really_long_words

   
    responseObject['statusCode'] = 200
    responseObject['headers'] = {}
    responseObject['headers']['Content-type'] = 'application/json'
    responseObject['body'] = json.dumps(data)

    return responseObject

