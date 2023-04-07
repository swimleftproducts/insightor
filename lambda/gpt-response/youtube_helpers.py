import time
import requests
import os

API_ENDPOINT = 'https://www.googleapis.com/youtube/v3/commentThreads'

def get_all_comments(video_id):
    """
    Retrieve all comments for a given YouTube video.

    Parameters:
    video_id (str): The video id of the desired video.
    YOUTUBE_API_KEY (str): API Key for YouTube.

    Returns:
    list: A list of all comments for the video.
    """
    YOUTUBE_API_KEY = os.environ['YOUTUBE_API_KEY']
    params = {
        'part': 'snippet',
        'videoId': video_id,
        'key': YOUTUBE_API_KEY,
        'maxResults': 100,
    }
    start_time = time.time()
    # Send a GET request to the API endpoint
    response = requests.get(API_ENDPOINT, params=params)

    # Check if the request was successful
    if response.status_code == 200:
        # Extract the comments from the response JSON
        comments = []
        data = response.json()
        while 'items' in data:
            for item in data['items']:
                comments.append(item['snippet']['topLevelComment']['snippet']['textOriginal'])
            if 'nextPageToken' in data:
                params['pageToken'] = data['nextPageToken']
                response = requests.get(API_ENDPOINT, params=params)
                data = response.json()
            else:
                break
        
        #print comments total
        print(len(comments))
    else:
        # Extract and print the error message from the response JSON
        error = response.json()['error']
        code = error['code']
        message = error['message']
        print(f"Request failed with error code {code}: {message}")

    # End timing the request and calculate the elapsed time
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Elapsed time: {elapsed_time:.2f} seconds")

    return comments