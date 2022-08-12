export const randomize = <T>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = 0; i < shuffled.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
