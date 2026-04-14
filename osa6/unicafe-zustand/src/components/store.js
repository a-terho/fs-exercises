import { create } from 'zustand';

const useStatsStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  all: 0,
  actions: {
    addGood: () =>
      set((state) => ({ good: state.good + 1, all: state.all + 1 })),
    addNeutral: () =>
      set((state) => ({ neutral: state.neutral + 1, all: state.all + 1 })),
    addBad: () => set((state) => ({ bad: state.bad + 1, all: state.all + 1 })),
  },
}));

const useGood = () => useStatsStore((state) => state.good);
const useNeutral = () => useStatsStore((state) => state.neutral);
const useBad = () => useStatsStore((state) => state.bad);
const useAll = () => useStatsStore((state) => state.all);

const useCountedAvg = () =>
  useStatsStore((state) => {
    // if (state.all === 0) return '-';
    const points = state.good * 1 + state.bad * -1;
    return (points / state.all).toFixed(4);
  });

const useCountedPos = () =>
  useStatsStore((state) => {
    // if (state.all === 0) return '-';
    return `${((state.good / state.all) * 100).toFixed(2)} %`;
  });

const useStatsControls = () => useStatsStore((state) => state.actions);

export {
  useGood,
  useNeutral,
  useBad,
  useAll,
  useCountedAvg,
  useCountedPos,
  useStatsControls,
};
