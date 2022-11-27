import collections
import re
from utils import getStopWords
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def basicAnalysis(words, comments):
    regex = re.compile('[^a-zA-Z]')
    common_words = getStopWords()
    
    clean_words =[]
    long_words=[]
    really_long_words = []
    for each in words:   
        each = each.lower()
        each = regex.sub('',each)

        if len(each)<4:
            continue
        if each in common_words:
            continue
        if len(each) > 7:
            really_long_words.append(each)
            clean_words.append(each)
            continue  
        if len(each) > 5:
            long_words.append(each)
            clean_words.append(each)
            continue
              
        clean_words.append(each)

    Counter = collections.Counter(clean_words)
    most_occur = Counter.most_common(10)

    Counter = collections.Counter(long_words)
    long_words = Counter.most_common(6)

    Counter = collections.Counter(really_long_words)
    really_long_words = Counter.most_common(6)


    sentiments = []
    for comment in comments:
        sid_obj = SentimentIntensityAnalyzer()
        sentiment_dict = sid_obj.polarity_scores(comment)
        sentiments.append(sentiment_dict['compound']) 

    response =  {
        'comments': len(comments),
        'sentiments': sentiments,
        'most_occur': most_occur[:10],
        'long_words': long_words[:15],
        'really_long_words': really_long_words[:10],
    }
    return response

