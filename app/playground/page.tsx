export default function Playground(){
  return (
    <main className="flex-min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div>
          <h1>Playground</h1>
          <h2>Happy Prompting!!</h2>
        </div>
        <div>Enter a prompt to get started</div>
        <form id="form">
          <input type="text" id="prompt" />
          <button type="submit">Submit</button>
        </form>
      </section>

    </main>
  )
}
