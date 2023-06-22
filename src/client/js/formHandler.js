function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value



    console.log("::: Form Submitted :::")
    const urlNewsArticle = formText = document.getElementById('name').value
   // console.log(Client.isValidUrl(urlNewsArticle))

    if (Client.isValidUrl(urlNewsArticle)) {
        console.log('Valid Url');
   
    // Get coordinates APIKEY
    fetch('http://localhost:8081/APIKEY')
        .then(res => {
            return res.json()
        })
        .then(function (data) {
            const key = data.key;
            console.log(data);
            return getSummary(urlNewsArticle, key);
        })
        .then(data => {
            console.log(data);
            return { body: data };
        })
        .then((data) => {
            // agreement :   "DISAGREEMENT"
            // confidence :            "86"
            // irony:            "NONIRONIC"
            // model:            "general"


            let entry = `${data.body.agreement} with a confidence of ${data.body.confidence}. This is ${data.body.irony} `
            console.log(entry);
            const resultsElement = document.getElementById('results');
            resultsElement.innerHTML = entry;

        })
    } else {
        const resultsElement = document.getElementById('results');
        resultsElement.innerHTML=('Please enter valid URL')
    }

    /* Function to GET local Key  */


    /* Function to GET Summary data */
    async function getSummary(URL, apiKey) {
        console.log("getSummary");
        console.log(URL);
        console.log(apiKey);

        const response = await fetch(
            `https://api.meaningcloud.com/sentiment-2.1?of=json&sentences=5&url=${URL}&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Failed to get Summary");
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
}


export { handleSubmit }
