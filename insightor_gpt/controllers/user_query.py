import services.youtube as youtube
import helpers.openai as openaicalls
import helpers.pinecone as pinecone
import helpers.response as response

def main(query, video_id, YOUTUBE_API_KEY):
    #see if comments have been pulled previously 
    # TODO: check time stamp and maybe repull
    is_new_video =  not pinecone.does_video_have_namespace(video_id)

    if is_new_video:
        print('is new video')
        #download all youtube comments
        all_comments = youtube.get_all_comments(video_id, YOUTUBE_API_KEY)
        #get list of embedded comments with dicts of form
        #{vector: [1,2,323], text: string}
        embedded_comments = openaicalls.get_embedding(all_comments)
        pinecone.upsert_to_pinecone(video_id, embedded_comments)
    # now all comments are in vector db, we need to embed the query
    query_embedding = openaicalls.get_query_embedding(query)
    # now get nearest 50  comments
    relevant_context = pinecone.get_context(query_embedding, video_id, 50)
    response_from_ai = openaicalls.get_gpt_response(query, relevant_context)
    return response.parse_response(response_from_ai)
