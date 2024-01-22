
//___________ GOOGLE PLACES  ___________//
export const googleKey = 'AIzaSyBBMeeABSN3vKTm8pw12UAcf7Gwcajymj4';


//___________ CUSTOM SEARCH ____________//

export const customSearchKey = 'AIzaSyDW7bNgl6zvJLw1MN7PDTSXgCEoITRvYgc';
export const searchEngineId = '81c835a580db7436d';


//_______________ OPEN AI ______________//

import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
  apiKey: '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'
})

export const openai = new OpenAIApi(config)
