export const verifiedType = (accountVerified) => {
  if (!accountVerified || accountVerified === "none")
    return { text: "", icon: "" };
  const text = "This account";
  const textAndIconVerified = {
    identity: {
      text: `${text} has verified the identity`,
      icon: "mdi:shield-user",
    },
    public_figure: {
      text: `${text} belongs to a public figure`,
      icon: "ic:sharp-verified",
    },
    company: {
      text: `${text} belongs to a company`,
      icon: "ri:building-3-fill",
    },
  };
  return textAndIconVerified[accountVerified];
};
