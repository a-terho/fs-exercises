import { isNotNumber } from './utils.ts';

type Rating = 1 | 2 | 3;

export interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  success: boolean;
  average: number;
  rating: Rating;
  ratingDescription: string;
}

export const calculateExercises = (target: number, days: number[]): Result => {
  if (target === undefined || days === undefined || days.length === 0) {
    throw new Error('parameters missing');
  }

  const average = days.reduce((sum, hours) => sum + hours, 0) / days.length;
  if (isNotNumber(target) || isNaN(average)) {
    throw new Error('malformatted parameters');
  }

  let ratingDescription = 'you forgot to exercise';
  let rating: Rating = 1;

  if (average < target * 0.5) {
    ratingDescription = 'that is a good starting point';
  } else if (average < target) {
    ratingDescription = 'not too bad but could be better';
    rating = 2;
  } else if (average >= target && average < target * 1.5) {
    ratingDescription = 'great job, you reached your target';
    rating = 2;
  } else if (average >= target * 1.5) {
    ratingDescription = 'you are exceeding your expectations';
    rating = 3;
  }

  return {
    periodLength: days.length,
    trainingDays: days.filter((hours) => hours > 0).length,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// seuraava osuus vain, jos scripti ajetaan komentoriviltä eikä moduulina
if (process.argv[1] === import.meta.filename) {
  try {
    if (process.argv.length === 2) {
      // oletusarvoinen syöte
      console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));
    } else {
      // destrukturoi vaihtelevan pituinen syöte
      const [, , target, ...days] = process.argv;

      console.log(
        calculateExercises(
          Number(target),
          days.map((hours) => Number(hours)),
        ),
      );
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error occurred');
    }
  }
}
