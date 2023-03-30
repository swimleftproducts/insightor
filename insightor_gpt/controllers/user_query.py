import services.youtube as youtube
import helpers.openai as openaicalls
import helpers.pinecone as pinecone

def main(query, video_id, YOUTUBE_API_KEY):
    #download all youtube comments
    all_comments = youtube.get_all_comments(video_id, YOUTUBE_API_KEY)
    #get list of embedded comments with dicts of form
    #{vector: [1,2,323], text: string}
    embedded_comments = openaicalls.get_embedding(all_comments)
    pinecone.upsert_to_pinecone(video_id, embedded_comments)
    pass