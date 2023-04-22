const axios = require('axios')

const API_URL = 'https://lnnqxaqalmxee46exnov3jupsa0srghv.lambda-url.us-east-1.on.aws/'


const makeQuery = async (videoId, query) => {
   try{
        const {data, status} = await axios.post(API_URL,{
            video_id: videoId,
            query: query
        })
        return data
   }catch (error) {
        console.log(error)
   }
}

export default {
    makeQuery
}
