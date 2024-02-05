export const formattedDate = (date: string) => {
  let fDate = new Date(date);
  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let formattedDate = fDate.toLocaleDateString("en-US", options);
  return formattedDate;
};
export const formattedTime = (time: number) => {
  let milliseconds = time;
  let minutes = Math.floor(milliseconds / 60000);
  let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  if (seconds.length == 1) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};