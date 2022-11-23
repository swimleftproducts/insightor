import spacy
from time import perf_counter
from collections import Counter
from .data.comments import comments
print(comments)
 
start = perf_counter()
text = 'This is a comment, U.S.A sick bro! That was great way to do that'

nlp = spacy.load('en_core_web_sm')


doc = nlp(text)

for token in doc[:8]:
    print(token, token.lemma_,token.pos_)

for sents in doc.sents:
    print(sents)


end = perf_counter()
print('run time was: ', (end-start))