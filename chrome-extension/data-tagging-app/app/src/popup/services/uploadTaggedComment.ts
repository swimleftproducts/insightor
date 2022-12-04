const axios = require('axios')

const API_URL = `https://sbk957ltol.execute-api.us-east-1.amazonaws.com/test/upload-tagged`

const uploadTaggedComment = async (taggedComment) => {      
    const {data, status} = await axios.post(API_URL,{
        ...taggedComment
    })
    return data
}

export {
    uploadTaggedComment
}
