import openai
import tiktoken

def remove_newlines(text):
    text = text.replace('\n', ' ')
    text = text.replace('\\n', ' ')
    while '  ' in text:
        text = text.replace('  ', ' ')
    return text

def get_query_embedding(query, model="text-embedding-ada-002"):
    return openai.Embedding.create(input=query, model=model)['data'][0]['embedding']


def get_embedding(comments, model="text-embedding-ada-002"):
    """
    Given a list of comments and an OpenAI model, returns a list of dictionaries that contain the comment text and its corresponding embedding vector.
    
    Parameters:
    comments (list): A list of strings that represent the comments to be embedded.
    model (str, optional): The OpenAI model to use for embedding. Default is "text-embedding-ada-002".
    
    Returns:
    list: A list of dictionaries that contain the comment text and its corresponding embedding vector, each in the following form:
        {
            'vector': [....],
            'text': 'the text of the comment embeded'
        }
        
    Note:
    This function is currently rate limited and may need to be modified to handle batching of API calls.
    """
    comments = [remove_newlines(comment) for comment in comments]
    embeddings = openai.Embedding.create(input=comments, model=model)['data']
    result = []
    for i, embedding in enumerate(embeddings):
        result.append({
            'vector': embedding['embedding'],
            'text': comments[i]
        })
    return result

def num_tokens_from_string(string: str, encoding_name: str='cl100k_base') -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens

def format_comments(relevant_context):
    formatted_comments = " ### ".join([comment['metadata']['text'] for comment in relevant_context])
    return formatted_comments

SYSTEM_PROMPT = """Please analyze the user's query and select the most relevant comment(s) from the provided comments
block that best address the user's query. The query follows QUERY and the comments follow COMMENTS:
and each comment is separated by '###'
"""

def get_gpt_response(query, relevant_context):
    formatted_comments = format_comments(relevant_context)
    query_plus_context = f"QUERY:{query} COMMENTS:{formatted_comments}"

    generated_text = generate_chat_completion(query_plus_context)
    print(generated_text)

def generate_chat_completion(query_plus_context):
    # Define the request parameters
    model_engine = "gpt-3.5-turbo"  # Replace with the model you want to use
    
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": query_plus_context}
    ]
    
    params = {
        "model": model_engine,
        "messages": messages,
        "max_tokens": 300,
        "temperature": 0,
    }

    # Make the API request
    response = openai.ChatCompletion.create(**params)

    # Extract the generated text from the response
    generated_text = response['choices'][0]['message']['content'].strip()

    return generated_text
