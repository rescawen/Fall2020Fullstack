interface HeightWeightObject {
    height: number
    weight: number
}

const parseHeightWeight = (args: Array<string>): HeightWeightObject => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const calculateBmi = (height: number, weight: number) => {

    const bmi = weight / ((height / 100) ^ 2)

    if (bmi < 18.5) {
        return "Underweight"
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal (healthy weight)"
    } else {
        return "Overweight"
    }
}

try {
    const { height, weight } = parseHeightWeight(process.argv)
    console.log(calculateBmi(height, weight))
} catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message)
} 

export { calculateBmi }