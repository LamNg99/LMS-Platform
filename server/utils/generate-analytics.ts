import { Document, Model } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}

export async function generateTwelveMonthsData<T extends Document>(
  model: Model<T>
): Promise<{ lastTwelveMonths: MonthData[] }> {
  const lastTwelveMonths: MonthData[] = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  for (let i = 11; i >= 0; i--) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 30
    );

    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 30
    );

    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    lastTwelveMonths.push({ month: monthYear, count });
  }
  return { lastTwelveMonths };
}
