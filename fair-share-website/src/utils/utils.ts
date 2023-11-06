export const calculateSumValue = <T>(name: keyof T, rows: T[]) =>
  rows.reduce((a, b) => {
    if ((b as object).hasOwnProperty(name) && typeof b[name] === "number") {
      return a + (b[name] as number);
    }
    return 0;
  }, 0);
