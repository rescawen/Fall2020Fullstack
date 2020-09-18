import React from 'react'

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Course = ({ course }) => {

  const courseName = <h2>{course.name}</h2>
  const courseContent = course.parts.map(part =>
    <Part key={part.id} part={part} />
  )
  const exercises = course.parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalExercises = <b>total of {exercises.reduce(reducer)} exercises</b> 

  return (
    <div>
      {courseName}
      {courseContent}
      {totalExercises}
    </div>
  )
}

export default Course