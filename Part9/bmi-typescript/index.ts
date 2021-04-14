import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (_req, res) => {

  if (!_req.query.height && !_req.query.weight) {
    res.json({
      error: "malformatted parameters"
    })
  }

  if (!isNaN(Number(_req.query.height)) && !isNaN(Number(_req.query.weight))) {
    res.json({
      weight: Number(_req.query.weight),
      height: Number(_req.query.height),
      bmi: calculateBmi(Number(_req.query.height), Number(_req.query.weight))
    })
  } else {
    res.json({
      error: "Provided values were not numbers!"
    })
  }


})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})