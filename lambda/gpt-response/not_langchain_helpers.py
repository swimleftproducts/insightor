import pinecone_helpers
import langchain_helpers
import pinecone_helpers
import openai_helpers
import youtube_helpers


def summarize_top_comments(video_id, title):
    comments = youtube_helpers.get_first_five_comments(video_id)
    prompt = f'''
    Please summarize the following comments for a youtube video.
    title: {title}
    comments: {comments}
    summary:'''
    response = openai_helpers.generate_chat_completion(prompt)
    print(response)


def get_relevant_comments(query, title, video_id):
    #embedding = langchain_helpers.use_HyDE(title).embed_query(query)
    hypothetical_comments = openai_helpers.get_HyDE(query, title, 3)
    print(hypothetical_comments)
    embeded_hypothetical_query = openai_helpers.get_query_embedding(hypothetical_comments)
    context = pinecone_helpers.get_context(embeded_hypothetical_query, video_id, 9)
    comments = [vector['metadata']['text'] for vector in context]
    return comments