import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}
const Statics = (props) => {
  return (
    <div>
      <h1>statics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
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