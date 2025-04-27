export interface Data {
  close: string;
  created_at: string;
  high: string;
  id: number;
  isin: string;
  low: string;
  open: string;
  symbol: string;
  trade_date: string;
  updated_at: string;
  volume: number;
}

export interface ChartData extends Data {
  chartDate: string;
  parsedClose: number;
}

export interface Range {
  min: number;
  max: number
}