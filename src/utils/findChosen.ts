export const findChosen = (value: number) => {
  const row = value / 3;
  return `Row: ${Number.isInteger(row) ? row + 1 : Math.ceil(row)},Col: ${
    (value % 3) + 1
  }`;
};
