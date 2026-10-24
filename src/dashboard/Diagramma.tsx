import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";

import { axiosRequest } from "../utils/token";

interface Debt {
  id: string;
  amount: number;
  currency: string;
  direction: "they_owe_me" | "i_owe_them";
  created_at: string;
}

interface ChartData {
  month: string;
  owesMe: number;
  iOwe: number;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DebtChart = () => {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getDebts = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await axiosRequest.get<Debt[]>(
          "/api/debts",
          {
            signal: controller.signal,
          }
        );

        if (!controller.signal.aborted) {
          setDebts(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error(err);
          setError("Не удалось загрузить диаграмму");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void getDebts();

    return () => controller.abort();
  }, []);

  const years = useMemo(() => {
    const availableYears = debts
      .map((debt) => new Date(debt.created_at).getFullYear())
      .filter((value) => Number.isFinite(value));

    return [...new Set([currentYear, ...availableYears])].sort(
      (a, b) => b - a
    );
  }, [debts, currentYear]);

  const chartData = useMemo<ChartData[]>(() => {
    const result: ChartData[] = months.map((month) => ({
      month,
      owesMe: 0,
      iOwe: 0,
    }));

    debts.forEach((debt) => {
      if (debt.currency !== "TJS") {
        return;
      }

      const date = new Date(debt.created_at);

      if (Number.isNaN(date.getTime())) {
        return;
      }

      if (date.getFullYear() !== year) {
        return;
      }

      const monthIndex = date.getMonth();
      const amount = Number(debt.amount);

      if (!Number.isFinite(amount)) {
        return;
      }

      if (debt.direction === "they_owe_me") {
        result[monthIndex].owesMe += amount;
      } else {
        result[monthIndex].iOwe += amount;
      }
    });

    return result;
  }, [debts, year]);

  const formatNumber = (value: number) => {
    if (value >= 1000) {
      return `${Number((value / 1000).toFixed(1))}k`;
    }

    return String(value);
  };

  return (
    <div className="w-full min-w-0 rounded-[28px] border border-[#e8edf3] bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[24px] font-bold text-[#25303d]">
          Monthly Debts Overview
        </h2>

        <Select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          sx={{
            minWidth: 130,
            borderRadius: "15px",
            color: "#526277",
            fontWeight: 600,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#dbe4ef",
            },
          }}
        >
          {years.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="mb-10 flex flex-wrap items-center gap-7">
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full bg-[#2bad83]" />
          <span className="text-sm font-medium text-[#39495e]">
            Lent (Owed to me)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full bg-[#ed2939]" />
          <span className="text-sm font-medium text-[#39495e]">
            Borrowed (I owe)
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex h-[360px] items-center justify-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="flex h-[360px] items-center justify-center text-red-500">
          {error}
        </div>
      ) : (
        <div className="h-[360px] w-full sm:h-[430px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 15,
                right: 15,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="5 5"
                vertical={false}
                stroke="#dce5ef"
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#8293a9",
                  fontSize: 12,
                }}
                dy={12}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#8293a9",
                  fontSize: 12,
                }}
                tickFormatter={formatNumber}
                width={45}
                allowDecimals={false}
              />

              <Tooltip
                formatter={(value, name) => [
                  `${Number(value).toLocaleString("ru-RU")} TJS`,
                  name === "owesMe"
                    ? "Мне должны"
                    : "Я должен",
                ]}
                contentStyle={{
                  borderRadius: "14px",
                  border: "1px solid #e7edf5",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              />

              <Line
                type="monotone"
                dataKey="owesMe"
                stroke="#2bad83"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#2bad83",
                }}
                activeDot={{ r: 7 }}
              />

              <Line
                type="monotone"
                dataKey="iOwe"
                stroke="#ed2939"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#ed2939",
                }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DebtChart;