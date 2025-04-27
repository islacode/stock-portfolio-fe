'use client';
import { Line, LineChart, XAxis, YAxis } from "recharts";
import data from './data.json';
import {useEffect, useState} from "react";
import {ChartData, Data, Range} from "@/app/types";
import {filterDataByCompany} from "@/app/helpers";



export default function Home() {
  const [companies] = useState<string[]>(data.reduce(
    (acc, item: Data) => {
      const newAcc = [...acc];

      if (!newAcc.includes(item.symbol)) {
        newAcc.push(item.symbol);
      }

      return newAcc
    }, ([] as string[]))
  );
  const [company, setCompany] = useState<string>('NVDA')
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [range, setRange] = useState<Range>({ min: 0, max: 0 });

  useEffect(() => {
    if (company) {
      setChartData(filterDataByCompany(company))
    }
  }, [company]);

  useEffect(() => {
    if (chartData.length) {
      setRange(chartData.reduce((acc, item) => {
        return {
          ...acc,
          min: acc.min > item.parsedClose ? item.close : acc.min,
          max: acc.max < item.parsedClose ? item.close : acc.max
        } as Range
      }, { min: chartData[0].parsedClose, max: chartData[0].parsedClose}))
    }
  }, [chartData])



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <select
          className="w-full rounded-lg bg-white border border-gray-300 text-gray-900 text-sm font-medium px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="companySelect"
          onChange={(evt) => setCompany(evt.target.value)}
          value={company}
        >
          {companies.map((company) => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
        <LineChart width={1000} height={800} data={chartData}>
          <XAxis dataKey="chartDate"/>
          <YAxis from={range.min} to={range.max} dataKey="parsedClose"/>
          {/*<CartesianGrid stroke="#eee" strokeDasharray="5 5"/>*/}
          <Line type="monotone" dataKey="parsedClose" stroke="#8884d8" activeDot={{ r: 8 }} />
          {/*<Line type="monotone" dataKey="pv" stroke="#82ca9d" />*/}
        </LineChart>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
