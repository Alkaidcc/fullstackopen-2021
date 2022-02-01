import React, { useState } from 'react'

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const Statics = ({good,neutral,bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good+neutral+bad} />
      <StatisticLine text="average" value={(good*1+neutral*0+bad*(-1))/(good+neutral+bad)} />
      <StatisticLine text="positive" value={good*100/(good+neutral+bad)+'%'} />
    </div>
  )
}
const StatisticLine = ({text,value}) => <p>{text} {value}</p>


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
      <h1>statics</h1>
      <Statics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App