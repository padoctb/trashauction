const formatMsDigits = ms => ms < 10 ? '0' + ms : '' + ms

export const formatTime = time => {
  let milliseconds = parseInt(time % 1000),
    seconds = Math.floor((time / 1000) % 60),
    minutes = Math.floor(time / (1000 * 60));

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds = formatMsDigits(Math.floor(milliseconds / 10))

  return {
    milliseconds,
    seconds,
    minutes
  };
};

export const generateId = () => `f${(~~(Math.random()*1e8)).toString(16)}`

export const downloadCsvFile = (csv) => {
  const encodedUri = encodeURI(csv);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `auction_lots (${new Date().toLocaleString()}).csv`);
  document.body.appendChild(link); 
  link.click();
  document.body.removeChild(link);
}