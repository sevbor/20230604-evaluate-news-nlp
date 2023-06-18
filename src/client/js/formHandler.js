function handleSubmit(event) {

    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    Client.checkForNews(formText)

    console.log("::: Form Submitted :::")

    const urlNewsArticle = formText = document.getElementById('name').value

    // Get coordinates APIKEY
    fetch('http://localhost:8081/APIKEY')
        .then(res => {
            return res.json()
        })
        .then(function (data) {
            const key= data.key;
            console.log(data);
            return getSummary(urlNewsArticle, key);
        })
        .then(data => {
            console.log(data);
            return { body: data };
        })
        .then((data) => {
            const entry =  data.body.summary;
            console.log(entry);
            return document.getElementById('results').innerHTML = entry
        })

    /* Function to GET local Key  */


    /* Function to GET Summary data */
    async function getSummary(URL, apiKey) {
        console.log("getSummary");
        console.log(URL);
        console.log(apiKey);

        const response = await fetch(
            `https://api.meaningcloud.com/summarization-1.0?of=json&sentences=5&url=${URL}&key=${apiKey}`
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
