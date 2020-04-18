import get from "just-safe-get";

export const getRating = (app, platform) => {
  if (platform) {
    return get(app, [platform, "rating"]);
  }
  const google = parseFloat(get(app, ["google", "rating"], 0));
  const apple = parseFloat(get(app, ["apple", "rating"], 0));
  return ((google + apple) / 2).toFixed(1);
};
