function checkForNews (inputText) {

    fetch('https://api.meaningcloud.com/summarization-1.0?of=json&sentences=5&url=https://de.wikipedia.org/wiki/Representational_State_Transfer&key=5ce27b79480e516c8adf35f70b5a18d0')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
   

    console.log("::: Running checkForNews :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}

export { checkForNews }
