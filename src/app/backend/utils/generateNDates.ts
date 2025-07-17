export function generateNOccurrences(
  startDate: Date,
  frequency: string,
  count: number
) {
  const occurrences = [];

  const currentDate = new Date(startDate);

  for (let i = 0; i < count; i++) {
    occurrences.push({
      dueDate: new Date(currentDate),
      status: "upcoming",
    });

    if (frequency === "monthly") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (frequency === "weekly") {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (frequency === "yearly") {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
  }

  return occurrences;
}
