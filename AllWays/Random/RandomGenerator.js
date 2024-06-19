/*

    RandomGenerator.js
    Generates Random Data

*/




/****************** Global Variables *********************/ 

const allMessages = [
    {
        title:'Hello',
        description:'Ok',
    },
    {
        title:'Hello2',
        description:'Top',
    },
    {
        title:'Hello3',
        description:'Fish',
    },
    {
        title:'Hello4',
        description:'Lap',
    },
    {
        title:'Hello5',
        description:'Foreal',
    }
]



/*********************** Functions ***********************/ 

// Generate new message
export function generateMessage (){
    let min = 0;
    let max = 4;

    let randomNumber = Math.round(Math.random() * (max - min) + min);
    
    return allMessages[randomNumber];
}