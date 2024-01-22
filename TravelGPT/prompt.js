/*

    Prompt.js
    Function to generate the api prompt

*/

// Generates the prompt for the Open AI
function generatePrompt (days, city) {

    const prompt = ` 
    
        Give me a JSON format only response for the following prompt: 

            Generate a route plan for ${days} days in ${city}, with 5 activities for each day with a name and description.
            For the activity name give only the name of the monument/place if that is the case, e.g. Colisseum, Palatine Hill.
            If the activity name is related to restaurants or food, replace the activity name with a restaurant in the specified city that serves that dish).
            For the activity description give only a single line response.
            For the day description give a 5 words max line response with a summary of the activities of that day.
            Try your best to keep the activities in the specified city.
            
            Use the following json format mandatorily:  

                [{  "day": "day1", 
                    "description: "day 1 description", 
                    "activities" : [
                        { "name": "activity name 1","description": "activity description"},
                        { "name": "activity name 2","description": "activity description"},
                        { "name": "activity name 3","description": "activity description"},
                        { "name": "activity name 4","description": "activity description"},
                        { "name": "activity name 5","description": "activity description"} 
                    ]}
                }]`

    return prompt;
}

export {generatePrompt};