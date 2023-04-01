import helpers.pinecone as pinecone

def delete_namespace(video_id):
    response = pinecone.delete_namespace(video_id)
    return response