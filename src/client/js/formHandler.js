function handleSubmit(event) {

    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value



    console.log("::: Form Submitted :::")

    const urlNewsArticle = formText = document.getElementById('name').value

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
            try{
            let entry = data.body.summary;
            console.log(entry);
            const resultsElement = document.getElementById('results');

            if (data.body.status.code =='0') {
                resultsElement.innerHTML = entry;
            
            } else {
                entry = 'Please enter a valid URL';
                resultsElement.innerHTML = entry;
            }
        }catch (error) {console.error("An error occured:",error);} 
        })

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
