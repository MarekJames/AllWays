/*

images-config.js 
  
  -> Has all functions related to images
  -> All screens if needed call functions from this file

*/

/******************** Imports Section ********************/ 

import axios from 'axios';
import { customSearchKey, searchEngineId } from './keys-config';




/******************** Functions ********************/ 

// Calls the API with a parameter query and updates the listsplan
async function getImageUrl(listsPlan2, query, index, counter, isConnected) {
    
    // Create URL
    const url = `https://www.googleapis.com/customsearch/v1?key=${customSearchKey}&cx=${searchEngineId}&q=${query}&searchType=image&num=1&fileType=jpg`;

    // Call API
    if(isConnected){
        try{
            await axios.get(url)
            .then((response) => {
                const image = response.data.items[0];
                return image;
            })
            .then((image) => {
                const imageUrl = image.link;
                
                // Check if its the route root image
                if(index == 10){
                    listsPlan2.imageUrl = imageUrl;
                }
                else{
                    if(listsPlan2[index].activities!=null){
                        listsPlan2[index].activities[0].imageUrl = imageUrl;
                    }
                    listsPlan2[index].imageUrl = imageUrl;
                }
            }) 
        }
        catch(e){
            
            // Only try three times, to not get an infinite loop
            if(counter++ < 3){
                await getImageUrl(listsPlan2, query, index, counter, isConnected);
            }
            else{
                console.log('After three tries the image for : ' + query + ' could not be loaded.');
            }
        }

        // Leave without throwing the error
        return;
    }
    
    // No network connection
    throw Error('Network');
}

export { getImageUrl }