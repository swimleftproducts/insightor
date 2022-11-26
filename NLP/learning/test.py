import spacy
from textblob import TextBlob
from time import perf_counter
from collections import Counter

comments = [
    'Great video! I have a 21 day trip coming up in a month- this got me even  more excited. Thanks for putting this video together and sharing!',
    'Wow, what a beautiful & fun adventure! Would love to have even one friend let alone an entire group of friends whod be interested in doing this!',
    'Wonderful video. Great job of photographing showing all the rapids of the entire canyon. You all did a great job of maneuvering the rafts through the rapids. Trip of a lifetime. Thanks for sharing.',
    "I think it's important to note that the Grand Canyon operates on a 1-10 scale. Their class 5 is the same as a Salmon River class 2.5.  I totally disagree with their scale because there are too many variables.  When you have a 1-10 scale what is the true difference between a 7 and an 8?  I think the Grand Canyon should align with every other rive and go to a 1-5 scale.",
    'Amazing journey! Thank you for sharing, Garrett!',
    'The contrast between water and rock is beautiful',
] 

 
start = perf_counter()

nlp = spacy.load('en_core_web_sm')

doc= nlp(comments[1])
sentences = list(doc.sents)

for sentence in sentences:
    doc = nlp(sentence.text)
    descriptive_term = ''
    target = ''
    for token in doc[:5]:
        print(token, token.pos_, list(token.children))
        if token.dep_ == 'nsubj' and token.pos_ == 'NOUN':
            target = token.text
        if token.pos_ == 'ADJ':
            prepend = ''
            for child in token.children:
                if child.pos_ != 'ADV':
                    continue
                prepend += child.text + ' '
            descriptive_term = prepend + token.text
    print(sentence)
    print(target, descriptive_term)




end = perf_counter()
print('run time was: ', (end-start))