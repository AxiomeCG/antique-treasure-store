import React from "react"
import "./App.scss"
import { ThreeViewer } from "./ThreeViewer";


function App() {

  return (<>
      <ThreeViewer/>
      <div className="scroll-container">
        <section className="section-1">
          <div className="section-1__wrapper">
            <h1>Antique Treasures</h1>
            <h2>Passing down the love of antiques from generation to generation</h2>
            <div className="section-1__button-container">
              <button className="section-1__cta">Find yours today</button>
              <button className="section-1__info">Who are we ?</button>
            </div>
          </div>
        </section>
        <section className="section-2">

          <div className="section-2__wrapper">
            <h1>Uncover the Beauty of Antiques</h1>
            <h2>Experience the Charm and History of Our Hand-Selected Antique Collection</h2>
          </div>
          <div className="svg-container">
            <svg id="shape" viewBox="0 0 1280 1024" fill="none" xmlns="http://www.w3.org/2000/svg"
                 preserveAspectRatio="xMidYMin slice">
              <path
                d="M-43 0.499995C-43 0.499995 286.701 25.1889 726.844 145.425C1240.51 285.745 1376.23 466.5 1376.23 466.5L1376.23 1023.5C1376.23 1023.5 1042.5 779.933 671 675C299.5 570.067 -43 622.627 -43 622.627L-43 0.499995Z"
                fill="#C1CCF1"/>
            </svg>
          </div>

        </section>
        <section className="section-3">
          <div className="section-3__wrapper">
            <h1>Celebrate Craftsmanship</h1>
            <h2>Discover the Artistry and Attention to Detail of Antiques Made with Unsurpassed Skill and Precision</h2>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
