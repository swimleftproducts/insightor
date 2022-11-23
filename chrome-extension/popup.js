const url = "https://sbk957ltol.execute-api.us-east-1.amazonaws.com/test/helloworld?videoid=mRL7oLcG23A"
const options = {
    method: "GET",
};

fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    console.log('Fetched in popus.js', data);
});