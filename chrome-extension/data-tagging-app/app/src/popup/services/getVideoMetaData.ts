const axios = require('axios')

const API_URL = `https://www.googleapis.com/youtube/v3/videos`

const getVideoDetail = async (videoId) => {      
    const {data, status} = await axios.get(API_URL,{
        params: {
            key: process.env.YOU_TUBE_API,
            id:videoId,
            part: 'snippet',
        }
    })
    return data
}

export {
    getVideoDetail
}
