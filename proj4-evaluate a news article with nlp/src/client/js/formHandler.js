const fetch = require("node-fetch")
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    //initialize the object storing the form text
    const text = {text: formText}

    //Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    performAction('/postRoute', text).then(function (newData) {
        console.log(document.getElementById('result'))
        document.getElementById('result').innerHTML = 'score_tag: ' + newData.score_tag
    })
}

async function performAction(url='', data={}) {
    const res = await fetch(url,{
        method: 'POST',
        credentials: "same-origin",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    try {
        const newData = await res.json()
        return newData
    } catch(error) {
        console.log(error)
    }
}

export { handleSubmit }
export { performAction }
