import openai
import tiktoken
import time

MAX_COMPLETION_TOKENS = 450

def remove_newlines(text):
    text = text.replace('\n', ' ')
    text = text.replace('\\n', ' ')
    while '  ' in text:
        text = text.replace('  ', ' ')
    return text

def get_query_embedding(query, model="text-embedding-ada-002"):
    return openai.Embedding.create(input=query, model=model)['data'][0]['embedding']


def batch_comments(comments , max_tokens= 5500):
    batches = []
    current_batch = []
    current_tokens = 0

    for comment in comments:
        num_tokens = num_tokens_from_string(comment)

        if current_tokens + num_tokens > max_tokens:
            batches.append(current_batch)
            current_batch = []
            current_tokens = 0

        current_batch.append(comment)
        current_tokens += num_tokens

    if current_batch:
        batches.append(current_batch)

    return batches


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
    print('Embedding this many comments:', len(comments))

    result = []
    batches = batch_comments(comments)

    for batch in batches:
        print('doing a batch', len(batch))
        try:
            embeddings = openai.Embedding.create(input=batch, model=model)['data']
            
            for i, embedding in enumerate(embeddings):
                if (embedding['index'] != i):
                    print('mismatched embedding index')
                result.append({
                    'vector': embedding['embedding'],
                    'text': batch[i]
                })
        except Exception as e:
            print(f"Error occurred while embedding comments: {e}")

    return result

def num_tokens_from_string(string: str, encoding_name: str='cl100k_base') -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens

def format_comments(relevant_context):    
    formatted_comments = []
    start = time.time()
    total_tokens = num_tokens_from_string(SYSTEM_PROMPT)
    
    for comment in relevant_context:
        text = str(comment['metadata']['text'])
        tokens = num_tokens_from_string(text)
        
        if total_tokens + tokens + MAX_COMPLETION_TOKENS<= 4000:
            formatted_comments.append(text)
            total_tokens += tokens
        else:
            break

    formatted_comments = " ### ".join(formatted_comments)
    end = time.time()
    return formatted_comments

# SYSTEM_PROMPT = """You are InsightorGPT, a tool for providing insight into YouTube comments. You are provided a query and a list of comments separated by ###.
# Create a list of the 2 comments that best answers the query. Only consider comments in the list of comments. The list should look like:
# *- example comment1
# *- example comment2
# If no comments are relevant to the query, respond NONE"""
SYSTEM_PROMPT = """
    Please provide a biased summary of the comments provided to you in the context of the query provided. The summary should confirm
    the any query bias and do not provide any counter points. Phrase the summary like a news article
"""


def get_gpt_response(query, relevant_context):
    formatted_comments = format_comments(relevant_context)
    query_plus_context = f"QUERY:{query} COMMENTS:{formatted_comments}"
    generated_text = generate_chat_completion(query_plus_context)
    print('response is', generated_text)
    return generated_text

def generate_chat_completion(query_plus_context):
    # Define the request parameters
    model_engine = "gpt-3.5-turbo"  # Replace with the model you want to use
    
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": query_plus_context}
    ]

    with open('recent_ask.txt', "w") as f:
        f.write(SYSTEM_PROMPT + "\n")
        f.write(query_plus_context)
    
    params = {
        "model": model_engine,
        "messages": messages,
        "max_tokens": MAX_COMPLETION_TOKENS,
        "temperature": 0,
    }

    # Make the API request
    response = openai.ChatCompletion.create(**params)

    # Extract the generated text from the response
    generated_text = response['choices'][0]['message']['content'].strip()

    return generated_text
