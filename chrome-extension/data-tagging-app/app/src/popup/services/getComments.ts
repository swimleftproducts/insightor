const axios = require('axios')

const API_URL = `https://www.googleapis.com/youtube/v3/commentThreads`

const getComments = async (nextPageToken, videoId) => {      
    console.log('api key', process.env.YOU_TUBE_API)
    const {data, status} = await axios.get(API_URL,{
        params: {
            nextPageToken,
            key: process.env.YOU_TUBE_API,
            videoId,
            part: 'snippet',
            textFormat: 'plaintext'
        }
    })
    console.log(data)
    return data
}

export {
    getComments
}
