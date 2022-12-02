import json
import boto3
import csv
import time

BUCKET_NAME = 'insightor-data'
PREFIX= 'raw'
HEADER = ['videoId', 'comment', 'category']

video_id = 'a'
comment = 'b'
label= 'b'

def lambda_handler(event, context):

    body = json.loads(event['body'])
    video_id= body['videoID']
    comment = body['comment']
    label = body['label']
    
    s3 = boto3.client('s3')
    
    ts = round(time.time())

    with open(f'/tmp/labeled-comment{ts}', 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(HEADER)
        w.writerow([video_id, comment, label])
        
        
    #upload the data into s3
    s3.upload_file(f'/tmp/labeled-comment{ts}',BUCKET_NAME , f'{PREFIX}/labeled-comment{ts}')
    
    
    return {
        'statusCode': 200,
        'body': 'tagged comment uploaded'
    }
