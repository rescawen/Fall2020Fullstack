/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercise } from './exerciseCalculator'
const app = express()
app.use(express.json())


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (_req, res) => {

  if (!_req.query.height || !_req.query.weight) {
    res.json({
      error: "malformatted parameters"
    })
  } else if (!isNaN(Number(_req.query.height)) && !isNaN(Number(_req.query.weight))) {
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

app.route('/exercise-calculator')
  .get(function (_req, res) {
    res.send('Exercise calculator!')
  })
  .post(function (_req, res) {
    const daily_exercises = _req.body.daily_exercises
    const target = _req.body.target

    if (!daily_exercises || !target) {
      res.json({
        error: "parameters missing"
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    } else if (!isNaN(Number(target)) && !daily_exercises.some(isNaN)) {
      res.json(calculateExercise(daily_exercises, target))
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