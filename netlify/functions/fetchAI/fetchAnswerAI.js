import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, get, remove } from 'firebase/database'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const appSettings = {
    databaseURL: 'https://prompt-playground-97436-default-rtdb.firebaseio.com/'
}
const openai = new OpenAIApi(configuration)

const app = initializeApp(appSettings)
const database = getDatabase(app)
const conversationInDb = ref(database)

const instructionObj = {
    role: 'system',
    content: 'You are a helpful assistant.'
}


const handler = async (event) => {
  try {
    pushConversation(event.body)
    get(conversationInDb).then(async (snapshot) => {
        if (snapshot.exists()) {
          const conversationArr = Object.values(snapshot.val())
          conversationArr.unshift(instructionObj)
          const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: conversationArr,
            presence_penalty: 0,
            frequency_penalty: 0.3,
            max_tokens: 500,
            temperature: 0,
          }) 
          push(conversationInDb, response.data.choices[0].message)
          return {
            statusCode: 200,
            body: JSON.stringify({ reply: response.data }),
          }
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Conversation does not exist' }),
          }
        }
    })
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

function pushConversation(input) {
  push(conversationInDb, {
    role: 'user',
    content: input
  })
}

module.exports = { handler }
