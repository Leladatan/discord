export const getNormalizeDate = (date: Date): string => {
  const createdAtProfileDay: string | number = date.getDay().toString().length > 1 ? date.getDay() : `0${date.getDay()}`;
  return `${createdAtProfileDay}:${date.getMonth()}:${date.getFullYear()}`;
};