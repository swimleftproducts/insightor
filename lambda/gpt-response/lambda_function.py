import json
import boto3
import csv
import time
import pinecone_helpers as pinecone
import youtube_helpers
import openai_helpers
from langchain import PromptTemplate, OpenAI, LLMChain

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
        # print('about to upsert')
        # pinecone.upsert_to_pinecone(video_id, embedded_comments)

    # template = """Question: {query}
    # Answer:"""
    # prompt = PromptTemplate(template=template, input_variables=["query"])
    # llm_chain = LLMChain(prompt=prompt, llm=OpenAI(temperature=0), verbose=False)
    # response = llm_chain.predict(query=query)


    return json.dumps({
        'statusCode': 200,
        'response_to': is_new_video,
        'text': embedded_comments[0]['text']
    })
