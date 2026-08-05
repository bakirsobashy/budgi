export const budgetFillColor = (percentage: number): string => {
  if (percentage >= 0.8) return "#DA3555";
  if (percentage >= 0.6) return "#FB6F4E";
  if (percentage >= 0.4) return "#FCC40B";
  if (percentage >= 0.2) return "#25A08B";
  return "#34C079";
};
