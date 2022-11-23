import requests
import os
import json

API_KEY = os.environ['YOU_TUBE']
URL = 'https://www.googleapis.com/youtube/v3/commentThreads'

def makeYouTubeCall(video_id,pageToken=None):
    params = {
        'videoId':video_id,
        'key': API_KEY,
        'part':'snippet',
        'order':'relevance'
    }
    if pageToken:
        params['pageToken'] = pageToken
    response= requests.get(URL, params=params)
    return response

def handle_error( response):
    responseObject = {}
    responseObject['statusCode'] = response.status_code
    responseObject['headers'] = {}
    responseObject['headers']['Content-type'] = 'application/json'
    responseObject['body'] = json.dumps({'message':'Error calling youtube'})
    return responseObject

def getWordsAndComments(body, words, comments):
    items = body.get('items')
    for each in items:
        snippet = each.get('snippet')
        top_level_comment = snippet.get('topLevelComment')
        comment = top_level_comment['snippet']['textOriginal']
        comments.append(comment)
        comment_words = comment.split()
        words.extend(comment_words)