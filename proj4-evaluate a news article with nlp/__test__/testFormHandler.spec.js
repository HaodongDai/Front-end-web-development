import { performAction } from '../src/client/js/formHandler'
const fetch = require('node-fetch')

//A test suite containing one or more tests

describe("Testing the non-default submit functionality", () => {
    // A specific test for function performAction including getting result from server and update the UI accordingly
    test("Testing performAction function and express endpoint", async done => {
        //Test input
        const url = 'http://localhost:8080/postRoute'
        const text = {text: 'good'}
        //Expected output
        const output = 'P'
        //Matcher
        console.log(performAction(url,text))
        const expected = await performAction(url,text)
        expect(expected.score_tag).toMatch(output)
        done()
    })
})
