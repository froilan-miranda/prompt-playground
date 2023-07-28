import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, remove } from 'firebase/database'

const appSettings = {
    databaseURL: 'https://prompt-playground-97436-default-rtdb.firebaseio.com/'
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const conversationInDb = ref(database)

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

const handler = async (event) => {
  try {
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ reply: await getConversation() }),
    }
 } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

const getConversation = () => {
  return get(conversationInDb).then(async (snapshot)=>{
    if(snapshot.exists()) {
      return Object.values(snapshot.val())
    }
  })
}

export { handler }
