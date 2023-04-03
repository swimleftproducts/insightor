const axios = require('axios')

const API_URL = 'http://localhost:5000/user-query'


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
