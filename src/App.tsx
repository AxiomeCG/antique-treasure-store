import React from "react"
import "./App.css"
import { Three } from "./Three";


function App() {

  return (<>
      <Three/>
      <div className="scroll-container">
        <section className="section-1">
          Section 1
        </section>
        <section className="section-2">
          Section 2
        </section>
        <section className="section-3">
          Section 3
        </section>
      </div>
    </>
  )
}

export default App
