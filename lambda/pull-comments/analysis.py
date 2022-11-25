import collections
import re

def basicAnalysis(words, comments):
    regex = re.compile('[^a-zA-Z]')
    common_words = ["","i", "me", "my", "myself", "we", "our", "ours", "ourselves", 
    "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself",
     "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", 
     "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", 
     "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", 
     "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", 
     "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with",
      "about", "against", "between", "into", "through", "during", "before", "after", 
      "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", 
      "under", "again", "further", "then", "once", "here", "there", "when", "where",
       "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", 
       "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", 
       "very", "s", "t", "can", "will", "just", "don", "should", "now"]
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
        'comments': comments,
        'most_occur': most_occur[:10],
        'long_words': long_words[:10],
        'really_long_words': really_long_words[:10],
    }
    return response

