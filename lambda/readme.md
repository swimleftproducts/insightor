# This folder contains the code for the lambda functions required for running insightor.

## List of Lambdas:
- pull-comments
- spacy

## required env variable
- YOU_TUBE - pull-comments - api key for youtube
-- export YOU_TUBE=xxxxxxxxxxxxxxxxxxx


## Deploying Lambda:
- build zip (when requirements are included):
    - go to lambda function dir, example: /pull-comments
    - pip freeze > requirements.txt
    - pip install -r requirements.txt  --target ./package
    - cd package
    - zip -r ../pull-comments.zip .
    - cd ..
    - zip pull-comments.zip lambda_function.py 
- upload zip to relevant lambda on aws

- when using a layer
    - make a layer
    - upload the layer to aws
    - just zip the lambda_function.py

-make layer
