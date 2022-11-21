This folder contains the code for the lambda functions required for running insightor.

List of Lambdas:
- pull-comments


Deploying Lambda:
- build zip:
-- go to lambda function dir, example: /pull-comments
-- pip freeze
-- pip install -r requirements.txt  --target ./package
-- cd package
-- zip -r ../pull-comments.zip .
-- cd ..
-- zip pull-comments.zip lambda_function.py 