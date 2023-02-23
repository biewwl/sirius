const formatTimer = (seconds) => {
  let timer = Math.floor(seconds);
  let format = "s";
  if (seconds > 60) {
    timer = Math.floor(seconds / 60);
    format = "m";
  }
  if (format === "m" && timer > 60) {
    timer = Math.floor(timer / 60);
    format = "h";
  }
  if (format === "h" && timer >= 24) {
    timer = Math.floor(timer / 24);
    format = "d";
  }
  if (format === "d" && timer >= 30) {
    timer = Math.floor(timer / 30);
    format = "mo";
  }
  if (format === "mo" && timer >= 12) {
    timer = Math.floor(timer / 12);
    format = "y";
  }
  return {
    timer,
    format,
  };
};

const elapsedTime = (date) => {
  const currentDate = new Date();
  const [justPostDate] = date.split(".");
  const postDate = new Date(justPostDate);
  const timeDiff = currentDate - postDate;
  const seconds = timeDiff / 1000;
  return formatTimer(seconds);
};

export default elapsedTime;