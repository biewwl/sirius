const formatFollows = (follows, key) =>
  follows.map((follow) => {
    const {
      date,
      [key]: { nick, id },
    } = follow;
    return { date, nick, [`${key}Id`]: id };
  });

module.exports = formatFollows;
