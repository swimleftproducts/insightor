from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import os
import json
import openai
import pinecone
import controllers.user_query as user_query_controller

mode = os.environ.get('MODE', 'local')


if mode == 'local':
    from dotenv import load_dotenv
    dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
    load_dotenv(dotenv_path)
    print('loading YOUTUBE_API_KEY')
    YOUTUBE_API_KEY = os.environ.get('GOOGLE_API_KEY')
    openai.api_key = os.environ.get('OPENAI_API_KEY')
    pinecone.init(api_key=os.environ.get('PINECONE_API_KEY'), environment="us-west4-gcp")

if mode == 'prod':
    pass

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/health-check', methods=['GET'])
def index():
    return 'service Healthy'


@app.route('/user-query', methods=['POST'])
def user_query():
    request_data = request.get_json()

    query = request_data.get('query')
    video_id = request_data.get('video_id')

    # get all you tube comments and
    response =   user_query_controller.main(query, video_id, YOUTUBE_API_KEY)

    return json.dumps({
        "relevant_comments": response
    })


if __name__ == '__main__':
    app.run()
