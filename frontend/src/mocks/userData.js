import avatarBlocked from "../images/avatar-blocked.png";
import coverBlocked from "../images/cover-blocked.png";

export const userBlockedData = () => ({
  name: "",
  nick: "",
  coverUrl: coverBlocked,
  avatarUrl: avatarBlocked,
  followersCount: "--",
  followingCount: "--",
  accountVerified: "none",
});

export const userNotFoundData = (nick) => ({
  name: "blocked by",
  nick,
  coverUrl: coverBlocked,
  avatarUrl: avatarBlocked,
  followersCount: "--",
  followingCount: "--",
  accountVerified: "none",
});

