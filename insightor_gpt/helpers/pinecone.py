import pinecone
import uuid
import datetime


INDEX = 'insightor-gpt'

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
    print(formatted_embeddings[0])
    for i in range(0, len(formatted_embeddings), batch_size):
        batch = formatted_embeddings[i:i + batch_size]
        
        # upsert_response = index.upsert(
        #     vectors=batch,
        #     namespace=video_id
        # )
    