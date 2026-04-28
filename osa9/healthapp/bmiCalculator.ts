import { isNotNumber } from './utils.ts';

const calculateBmi = (heightCm: number, weightKg: number): string => {
  if (isNotNumber(heightCm) || isNotNumber(weightKg)) {
    throw new Error('bad input: please only use number values');
  }

  const bmi = weightKg / (heightCm / 100) ** 2;

  if (bmi >= 30.0) return 'Obese';
  else if (25.0 <= bmi && bmi <= 30.0) return 'Overweight';
  else if (18.5 <= bmi && bmi <= 25.0) return 'Normal weight';
  else return 'Underweight';
};

try {
  if (process.argv.length === 2) {
    // oletusarvoinen syöte
    console.log(calculateBmi(180, 74));
  } else if (process.argv.length < 4) {
    throw new Error('bad input: give both height and width');
  } else {
    const heightCm = Number(process.argv[2]);
    const weightKg = Number(process.argv[3]);
    console.log(calculateBmi(heightCm, weightKg));
  }
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log(err.message);
  } else {
    console.error('Unknown error occurred');
  }
}
