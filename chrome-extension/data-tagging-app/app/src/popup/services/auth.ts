const axios = require('axios')

const API_URL = 'https://i4ns42rneavinn3qsclc3i6y340icbtd.lambda-url.us-east-1.on.aws/'


const getAuth = async (userPin) => {
   try{         
        const {data, status} = await axios.get(API_URL,{
            params: {user_pin: userPin}
        })
        return data
    }catch (error) {
        throw new Error(error)
    }
}

export {
    getAuth
}
