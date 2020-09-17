import React from 'react'

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Course = ({ course }) => {
  const totalExercises = course.parts.map(part => part.exercises).reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  })

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