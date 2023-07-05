export const organizeStories = (stories) => {
  const newStories = [];
  stories.forEach((story) => {
    const { userStory } = story;
    const { nick } = userStory;
    const existStoryByUser = newStories.some((s) => s.userStory.nick === nick);

    if (!existStoryByUser) newStories.push(story);
  });
  return newStories;
};

export const sortStories = (stories) => {
  const orderedStories = stories.sort((a, b) =>
    a.userStory.nick > b.userStory.nick
      ? 1
      : b.userStory.nick > a.userStory.nick
      ? -1
      : 0
  );
  return orderedStories;
};
