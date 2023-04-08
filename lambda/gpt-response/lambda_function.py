import json
import boto3
import csv
import time
import pinecone_helpers as pinecone
import youtube_helpers
import openai_helpers
import langchain_helpers
import not_langchain_helpers

def lambda_handler(event, context):
    body = json.loads(event['body'])
    query = body['query']
    video_id = body['video_id']

    #general init
    pinecone.pinecone_init()
    openai_helpers.openai_init()

    #are video comments already saved?
    is_new_video =  not pinecone.does_video_have_namespace(video_id)
    if is_new_video:
        all_comments = youtube_helpers.get_all_comments(video_id)
        print('about to embed')
        embedded_comments = openai_helpers.get_embedding(all_comments)
        print(embedded_comments[0]['text'])
        print('about to upsert')
        pinecone.upsert_to_pinecone(video_id, embedded_comments)
    
    #getTitle
    title = youtube_helpers.get_video_title(video_id)
    print('Video_title: ',title)
    
    # get llm

    not_langchain_helpers.summarize_top_comments(video_id,title)
    #comments = not_langchain_helpers.get_relevant_comments(query, title, video_id)

    return json.dumps({
        'statusCode': 200,
        'response_to': is_new_video,
        'comments': comments
    })
