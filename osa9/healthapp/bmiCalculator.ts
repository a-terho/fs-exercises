import { isNotNumber } from './utils.ts';

export const calculateBmi = (heightCm: number, weightKg: number): string => {
  if (isNotNumber(heightCm) || isNotNumber(weightKg)) {
    throw new Error('malformatted parameters');
  }

  const bmi = weightKg / (heightCm / 100) ** 2;

  if (bmi >= 30.0) return 'Obese';
  else if (25.0 <= bmi && bmi <= 30.0) return 'Overweight';
  else if (18.5 <= bmi && bmi <= 25.0) return 'Normal range';
  else return 'Underweight';
};

// seuraava osuus vain, jos scripti ajetaan komentoriviltä eikä moduulina
if (process.argv[1] === import.meta.filename) {
  try {
    if (process.argv.length === 2) {
      // oletusarvoinen syöte
      console.log(calculateBmi(180, 74));
    } else if (process.argv.length < 4) {
      throw new Error('bad input: give both height and weight');
    } else {
      const heightCm = Number(process.argv[2]);
      const weightKg = Number(process.argv[3]);
      console.log(calculateBmi(heightCm, weightKg));
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error occurred');
    }
  }
}
