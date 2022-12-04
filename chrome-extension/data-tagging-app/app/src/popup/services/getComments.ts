const axios = require('axios')

const API_URL = `https://www.googleapis.com/youtube/v3/commentThreads`

const getComments = async (nextPageToken, videoId) => {    
    const {data, status} = await axios.get(API_URL,{
        params: {
            pageToken: nextPageToken,
            key: process.env.YOU_TUBE_API,
            videoId,
            part: 'snippet',
            textFormat: 'plaintext'
        }
    })
    return data
}

export {
    getComments
}
