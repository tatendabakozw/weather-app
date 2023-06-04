export const recomment_clothing = (condition) => {
  console.log("condition on weather function", condition);
  let recommendation = "";
  switch (condition) {
    case "sunny":
      recommendation = "We recommend you wear a sun hat";
      return recommendation;
    case "cloudy":
      recommendation = "Might be a bit chilly, so have your jacket near";
      return recommendation;
    case "rain":
      recommendation = "It might rain today, to bring an umbrella";
      return recommendation;
    default:
      recommendation = "We could not recommend any clothing today";
  }
  return recommendation;
};

export const recommend_farming = (condition) => {
  console.log("condition on weather function", condition);
  let recommendation = "";
  switch (condition) {
    case "sunny":
      recommendation =
        "It's not adviced for a farmer to be in the field for too long in sunny weather. Its bad for your health";
      return recommendation;
    case "cloudy":
      recommendation =
        "Better start working, it's the optimal weather to do your feild work, Just check if it starts drizzling. Happy farming";
      return recommendation;
    case "rain":
      recommendation =
        "It's going to rain today, so it is not necessary for you to water your plants. Happy  farming";
      return recommendation;
    default:
      recommendation = "We could not recommend any clothing today";
  }
  return recommendation;
};
