import pinecone
import uuid
import datetime


INDEX = 'insightor-gpt'

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

def delete_namespace(video_id):

    index = pinecone.Index(INDEX) 

    response = index.delete(deleteAll='true', namespace=video_id)
    return response

def format_embeddings(embeddings, video_id):
    """
    Format the embeddings into the format required by Pinecone API

    Arguments:
    - embeddings: List of dictionaries, where each dictionary contains the embedding vector and text of a comment
    - video_id: ID of the video associated with the comments

    Returns:
    - result: List of dictionaries, where each dictionary has the format:
        {
            'id': str,
            'values': List,
            'metadata': Dict
        }
    """
    result = []
    timestamp = datetime.datetime.now().isoformat()
    for embedding in embeddings:
        result.append({
            'id': str(uuid.uuid4()),
            'values': embedding['vector'],
            'metadata': {
                'text': embedding['text'],
                'video_id': video_id,
                'time_stamp': timestamp
            }
        })
    return result

def upsert_to_pinecone(video_id, embeddings, batch_size=100):
    """
    Upsert the embeddings to Pinecone API

    Arguments:
    - index_name: Name of the index in Pinecone API to upsert the embeddings
    - embeddings: List of dictionaries, where each dictionary has the format:
        {
            'id': str,
            'values': List,
            'metadata': Dict
        }
    - batch_size: Maximum number of vectors to send in a single upsert request

    Returns:
    - None
    """
    index = pinecone.Index(INDEX) 
    formatted_embeddings = format_embeddings(embeddings, video_id)   
    for i in range(0, len(formatted_embeddings), batch_size):
        batch = formatted_embeddings[i:i + batch_size]
        
        upsert_response = index.upsert(
            vectors=batch,
            namespace=video_id
        )
    return upsert_response

def get_context(query_embedding, video_id, k):
    """
    Get the k nearest neighbors of a query embedding from the Pinecone API

    Arguments:
    - query_embedding: The embedding of the text for which to find the nearest neighbors
    - video_id: ID of the video associated with the comments
    - k: Number of nearest neighbors to return

    Returns:
    - matches: List of dictionaries, where each dictionary has the format:
        {
            'id': str,
            'metadata': Dict,
            'score': float,
            'values': List
        }
    """
    index = pinecone.Index(INDEX) 
    query_response = index.query(
        namespace=video_id,
        top_k=k,
        include_values=False,
        include_metadata=True,
        vector=query_embedding,
    )
    print('top context reply is \n', query_response['matches'][0]['metadata']['text'])
    return query_response['matches']
