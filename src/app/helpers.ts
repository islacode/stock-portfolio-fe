import data from "@/app/data.json";
import {ChartData} from "@/app/types";

export function convertDateToUTC(date: string): string {
  const dateObject = new Date(date);
  const utcDate = new Date(dateObject.toUTCString());
  console.log('utcDate', utcDate)
  return utcDate.toISOString().split('T')[0];
}

export function filterDataByCompany(company: string): ChartData[] {
  return data.filter(item => item.symbol === company).map(item => {
    return {
      ...item,
      chartDate: convertDateToUTC(item.trade_date), // Extract date part
      parsedClose: parseFloat(item.close)
    }
  })
}