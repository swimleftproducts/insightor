from lambda_function import lambda_handler
from time import perf_counter
import pprint
import json

comments = [
    'Great video! I have a 21 day trip coming up in a month- this got me even  more excited. Thanks for putting this video together and sharing!',
    'Wow, what a beautiful & fun adventure! Would love to have even one friend let alone an entire group of friends whod be interested in doing this!',
    'Wonderful video. Great job of photographing showing all the rapids of the entire canyon. You all did a great job of maneuvering the rafts through the rapids. Trip of a lifetime. Thanks for sharing.',
    'Wonderful video. Great job of photographing showing all the rapids of the entire canyon. You all did a great job of maneuvering the rafts through the rapids. Trip of a lifetime. Thanks for sharing.',
    "I think it's important to note that the Grand Canyon operates on a 1-10 scale. Their class 5 is the same as a Salmon River class 2.5.  I totally disagree with their scale because there are too many variables.  When you have a 1-10 scale what is the true difference between a 7 and an 8?  I think the Grand Canyon should align with every other rive and go to a 1-5 scale.",
    'Amazing journey! Thank you for sharing, Garrett!',
    'The contrast between water and rock is beautiful',
]

event = {
    'comments': comments
}

start = perf_counter()
response = lambda_handler(event, {})

body= json.loads(response['body'])
pprint.pprint(body)
# print(json.load(type(body)))
# pprint.pprint(body)
end = perf_counter()

print('Requests took: ',end-start,' s')