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
    
    words = []
    for token in doc:
        if len(token) < 4:
            continue
        if token.is_stop:
            continue
        if token.is_punct:
            continue
        if token.text == ' ' or token.text == '\n':
            continue 
        words.append((token.text, token.pos_))

    words_counted = Counter(words).most_common(len(words))
    

    def format_words(list_per_word):
        formated_list = [list_per_word[0][0], list_per_word[0][1],list_per_word[1]]
        return formated_list
    
    formated_words_counted = map(format_words, words_counted)
  
    return {'words': list(formated_words_counted)}

