import openai
import tiktoken

def remove_newlines(text):
    text = text.replace('\n', ' ')
    text = text.replace('\\n', ' ')
    while '  ' in text:
        text = text.replace('  ', ' ')
    return text

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