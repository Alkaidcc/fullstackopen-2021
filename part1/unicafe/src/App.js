import React, { useState } from 'react'

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const Statics = ({good,neutral,bad}) => {
  return (
    <div>
      <h1>statics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+neutral+bad}</p>
      <p>average {(good*1+neutral*0+bad*(-1))/(good+neutral+bad)}</p>
      <p>positive {good*100/(good+neutral+bad)}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => setGood(good + 1)
  const neuHandler = () => setNeutral(neutral + 1)
  const badHandler = () => setBad(bad + 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={goodHandler} text="good" />
      <Button onClick={neuHandler} text="neutral" />
      <Button onClick={badHandler} text="bad" />
      <Statics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App