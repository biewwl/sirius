const formatFollows = (follows, key) =>
  follows.map((follow) => {
    const {
      [key]: { nick },
    } = follow;
    return nick;
  });

const formatSearch = (searchResults, key) =>
  searchResults.map((queryResult) => {
    const { nick } = queryResult.dataValues;
    return nick;
  });

const formatBlocks = (blocks) =>
  blocks.map((block) => {
    const {
      date,
      blocked: { nick },
    } = block;
    return { date, nick };
  });

module.exports = { formatFollows, formatSearch, formatBlocks };
