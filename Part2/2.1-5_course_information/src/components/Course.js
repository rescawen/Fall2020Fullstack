import React from 'react'

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Course = ({ course }) => {

  const exercises = course.parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalExercises = exercises.reduce(reducer)
  
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part =>
        <Part key={part.id} part={part} />
      )}
      <b>total of {totalExercises} exercises</b>
    </div>
  )
}

export default Course