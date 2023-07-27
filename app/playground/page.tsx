'use client';
import { useState  } from 'react'
export default function Playground(){

  const [userInput, setUserInput] = useState('')

  /*
    const userInput = document.getElementById('user-input')   
  document.addEventListener('submit', (e) => {
    conversationStr += `${userInput.value} ->`
    
    console.log(conversationStr)
    fetchReply()
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
  })
   */

  const fetchPropmtReply = async (e) => {
    e.preventDefault()
    console.log('ready to fetch')
    const url = 'https://gleaming-entremet-fd05b3.netlify.app/.netlify/functions/fetch-ai-response'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: userInput 
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <main className="flex-min-h-screen flex-col items-center justify-between p-24">
      <section className="min-h-screen justify-between bg-slate-200 w-96 mx-auto p-8">
        <div>
          <h1>Playground</h1>
          <h2>Happy Prompting!!</h2>
        </div>
        <div className="min-h-[300px]">Enter a prompt to get started</div>
        <form id="form" onSubmit={(e) => fetchPropmtReply(e)}>
          <input type="text" name="user-input" id="user-input" value={userInput} onChange={(e) => setUserInput(e.target.value)} required />
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  )
}
