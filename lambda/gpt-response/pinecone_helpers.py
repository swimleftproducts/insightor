import pinecone
from dotenv import load_dotenv
import os
import pinecone

INDEX = 'insightor-gpt'


def pinecone_init():
    mode = os.environ.get('mode')
    if mode == 'local':
        PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
        pinecone.init(api_key=PINECONE_API_KEY, environment="us-west4-gcp")
    else:
        pinecone.init( environment="us-west4-gcp")    

def does_video_have_namespace(video_id):
    """
    Check if the specified video ID has a namespace in Pinecone API
    Arguments:
    - video_id: ID of the video to check

    Returns:
    - exists: Boolean, indicating whether the video ID has a namespace in Pinecone API
    """
    index = pinecone.Index(INDEX) 

    index_stats_response = index.describe_index_stats()
    namespaces = index_stats_response.get('namespaces')

    exists = video_id in namespaces
    return exists
