/*

    ai-config.js
    Handles AI functions

*/

/******************** Imports Section ********************/ 

import axios from 'axios';

    


/*********************** Functions ***********************/ 

// Call ChatGPT
async function callAI (prompt, isConnected){
    
    const apiKey = process.env.EXPO_PUBLIC_GPT_KEY;

    console.log('Network Connection? : ' + isConnected);
    if(isConnected){
        try{
            const result = await axios.post(
                'https://api.openai.com/v1/completions',
                {
                    prompt: prompt,
                    max_tokens: 2048,
                    model: "gpt-3.5-turbo-instruct"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`
                    },
                },
            )

            return JSON.parse(result.data.choices[0].text);
        }
        catch(e){
            throw Error(e.message);
        }
    }

    // No Internet Connection
    throw Error('Network');
}

// Generates the prompt for the Open AI
function generatePrompt (city, startDate, endDate, includeFood) {

    prompt = '';

    if(!includeFood){
        prompt = ` 
        Give me a JSON format only response for the following prompt: Generate a route plan for the following dates: ${startDate} till ${endDate} in ${city}, with 6 activities for each day with the day, date with only day and month and a description. 
        For the activity name give only the name of the monument/place if that is the case, e.g. Colisseum, Palatine Hill. Just include activities and no food suggestions, just the best and most famous pint points/monuments/activites of the city. 
        For the activity description give only a single line response. For the day description give a 5 words max line response with a summary of the activities of that day. 
        Try your best to keep the activities in the specified city. 
        Use the following json format mandatorily: [
            { "day": "Day 1", "date": "20/04", "description: "day 1 description", "activities" : [ 
                { "name": "activity name 1","description": "activity description"}, 
                { "name": "activity name 2","description": "activity description"}, 
                { "name": "activity name 3","description": "activity description"}, 
                { "name": "activity name 4","description": "activity description"}, 
                { "name": "activity name 5","description": "activity description"} 
            ]} 
        }]`
    }
    else{
        prompt = ` 
        Give me a JSON format only response for the following prompt: Generate a route plan for the following dates: ${startDate} till ${endDate} in ${city}, with 6 activities for each day with the day, date with only day and month and a description.
        For the activity name give only the name of the monument/place if that is the case, e.g. Colisseum, Palatine Hill. If the activity name is related to restaurants or food, replace the activity name with a restaurant in the specified city that serves that dish, preferebly not an expensive one and very traditional and on the way between the suggested points).
        For the activity description give only a single line response. For the day description give a 5 words max line response with a summary of the activities of that day.
        Try your best to keep the activities in the specified city. 
        Use the following json format mandatorily:
            [{ "day": "Day 1", "date": "20/04", "description: "day 1 description", "activities" : [
                { "name": "activity name 1","description": "activity description"}, 
                { "name": "activity name 2","description": "activity description"}, 
                { "name": "activity name 3","description": "activity description"}, 
                { "name": "activity name 4","description": "activity description"},
                { "name": "activity name 5","description": "activity description"} 
            ]}
        }]
        `
    }

    return prompt;
}

export {generatePrompt, callAI};