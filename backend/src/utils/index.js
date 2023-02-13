const formatFollows = (follows, key) =>
  follows.map((follow) => {
    const {
      date,
      [key]: { nick },
    } = follow;
    return { date, nick };
  });

const formatBlocks = (blocks) =>
  blocks.map((block) => {
    const {
      date,
      blocked: { nick },
    } = block;
    return { date, nick };
  });

module.exports = { formatFollows, formatBlocks };
