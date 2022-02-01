import React, { useState } from 'react'


const MostVotes = ({points,anecdotes}) => {
  const maxIndex = points.indexOf(Math.max(...points))
  return (
    <p>{anecdotes[maxIndex]}</p>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0])

  const handleAnecodtes = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }
  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecodte of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected] } votes</p>
      <button onClick={handleVoteClick} >vote</button>
      <button onClick={handleAnecodtes}>next anecodte</button>
      <h1>Anecodte with most votes</h1>
      <MostVotes points={points} anecdotes={anecdotes}  />
    </div>
  )
}

export default App