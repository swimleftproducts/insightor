import json
import spacy
from collections import Counter

def lambda_handler(event, context):
    comments = event.get('comments')
    all_comments = ''
    for comment in comments:
        all_comments = all_comments + comment

    nlp = spacy.load('en_core_web_sm')
    doc =nlp(all_comments)
    
    # all tokens that arent stop words or punctuations
    words = [token.text for token in doc if not token.is_stop and not token.is_punct and (token.text != ' ')]
    longWords = [token.text for token in doc if not token.is_stop and not token.is_punct and (len(token.text) > 6)]
    # five most common tokens
    word_freq = Counter(words)
    long_word_freq = Counter(longWords)
    
    common_words = word_freq.most_common(10)
    long_common_words = long_word_freq.most_common(5)



    responseObject = {}
    responseObject['statusCode'] = 200
    responseObject['headers'] = {}
    responseObject['headers']['Content-type'] = 'application/json'
    responseObject['body'] = json.dumps({
        "common_words":common_words,
        "long_common_words": long_common_words
    })

    return responseObject

