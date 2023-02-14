export const verifiedType = (accountVerified) => {
  const textVerified = {
    identity: "has verified the identity",
    public_figure: "belongs to a public figure",
  };
  const defineTextVerified = `This account ${textVerified[accountVerified]}`;
  return defineTextVerified;
}