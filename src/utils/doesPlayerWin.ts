//I know this is not the best way to handle this, but i keep it to you know that i did it by myself and my thoughts
//regards
export const doesPlayerWin = (choices: number[]) => {
  for (let i = 0; i < choices.length; i++) {
    if (
      (choices[i] === 0 || choices[i] === 3 || choices[i] === 6) &&
      choices.includes(choices[i] + 1) &&
      choices.includes(choices[i] + 2)
    )
      return true;
    if (choices.includes(choices[i] + 3) && choices.includes(choices[i] + 6))
      return true;
    if (choices.includes(choices[i] + 4) && choices.includes(choices[i] + 8))
      return true;
    if (
      choices[i] === 2 &&
      choices.includes(choices[i] + 2) &&
      choices.includes(choices[i] + 4)
    )
      return true;
  }
  return false;
};
