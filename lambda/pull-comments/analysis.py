import collections
import re

def basicAnalysis(words, comments):
    regex = re.compile('[^a-zA-Z]')
    common_words = ['the','be','to','of','and','a','in','that','have','i','it',
                    'for','not','on','with','he','as','you','do','at','this','but',
                    'his','by','from','they','we','say','or','an','will','']
    clean_words =[]
    long_words=[]
    really_long_words = []
    for each in words:
        each = each.lower()
        each = regex.sub('',each)
        if each in common_words:
            continue
        if len(each) > 7:
            really_long_words = really_long_words + [each]
            clean_words = clean_words + [each]
            continue  
        if len(each) > 5:
            long_words = long_words + [each]
            clean_words = clean_words + [each]
            continue
              
        clean_words = clean_words + [each]

    Counter = collections.Counter(clean_words)
    most_occur = Counter.most_common(6)

    response =  {
        'comments': len(comments),
        'most_occur': most_occur,
        'long_words': long_words,
    }
    return response

