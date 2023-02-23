const filterUnblockedUsers = (users) => users.filter((user) => !user.error);

export default filterUnblockedUsers;
