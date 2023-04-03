const axios = require('axios')

const API_URL = 'https://sbk957ltol.execute-api.us-east-1.amazonaws.com/test/getanalysis'


const getAnalysis = async (videoId) => {
   try{
        const {data, status} = await axios.get(API_URL,{
            videoId: videoId,
        })
   }catch (error) {
        console.log(error)
   }
}

export default {
    getAnalysis
}
