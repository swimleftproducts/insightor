This is for a lambda that takes a query and returns a LLM powered response

running localy

env variables:
YOUTUBE_API_KEY , key for youtube api
PINECONE_API_kEY , key for pinecone
OPENAI_API_KEY key for openai


Built steps:
run pipreqs . --force   NOTES: not sure why pinecone==0.1.0 is getting addeded
docker build -t insightor .
docker tag insightor:latest 216068982475.dkr.ecr.us-east-1.amazonaws.com/insightor:latest
docker push 216068982475.dkr.ecr.us-east-1.amazonaws.com/insightor:latest