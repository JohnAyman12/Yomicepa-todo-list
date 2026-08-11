import './App.css'

function App() {

  return (
    <><main>
      <h2>Tasks</h2>
      <form className="form">
        <input type="text" className="form-input" />
        <button type="submit" className="btn">add task</button>
      </form>
      <ul className="list"></ul>
      <button className="test-btn">click me</button>
    </main>
    </>
  )
}

export default App
