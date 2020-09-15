import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))

  const randomSelect = () => setSelected(Math.floor((Math.random() * 6)))

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <br />
      {'has ' + points[selected] + ' votes'}
      <br />
      <Button onClick={voteAnecdote} text="vote" />
      <Button onClick={randomSelect} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      {props.anecdotes[points.indexOf(Math.max(...points))]}
      <br />
      {'has ' + points[points.indexOf(Math.max(...points))] + ' votes'}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)