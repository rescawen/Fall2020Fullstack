interface InputObject {
    target: number,
    exerciseHours: Array<number>
}

interface ResultObject {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const parseArguments = (args: Array<string>): InputObject => {
    if (args.length < 4) throw new Error('Not enough arguments')

    const exerciseHours: Array<number> = []

    for (let i = 2; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            exerciseHours.push(Number(args[i]))
        } else {
            throw new Error('Provided values were not numbers!')
        }
    }
    
    exerciseHours.shift()
    return {
        target: Number(args[2]),
        exerciseHours: exerciseHours
    }
}

const calculateExercise = (exerciseHours: Array<number>, target: number): ResultObject => {

    const periodLength = exerciseHours.length
    const goodLimit = Math.round(periodLength * 0.7)
    const decentLimit = Math.round(periodLength * 0.3)
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue
    const daysMetTarget = exerciseHours.filter(e => e >= target).length

    let performance = 1
    let encouragement = "try harder next week"
    if (daysMetTarget > goodLimit) {
        performance = 3
        encouragement = "keep up the good work"
    } else if (daysMetTarget < goodLimit && daysMetTarget > decentLimit) {
        performance = 2
        encouragement = "not too bad but could be better"
    }

    return {
        periodLength: periodLength,
        trainingDays: exerciseHours.filter(e => e > 0).length,
        success: exerciseHours.every(e => e > target),
        rating: performance,
        ratingDescription: encouragement,
        target: target,
        average: Number(exerciseHours.reduce(reducer)) / periodLength
    }
}

try {
    const { target, exerciseHours } = parseArguments(process.argv)
    console.log(calculateExercise(exerciseHours, target))
} catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message)
}

export { calculateExercise }




