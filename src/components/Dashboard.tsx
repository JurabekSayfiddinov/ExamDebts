import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Alert,
  CircularProgress,
  Fab,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { axiosRequest } from "../utils/token";

import DashboardHeader from "@/dashboard/DashboardHeader";
import SummaryCards from "@/dashboard/Cards";
import DebtChart from "@/dashboard/Diagramma";
import RecentPayments from "@/dashboard/RecentPayments";
import { useRecentPayments } from "@/hooks/useRecentPayments";

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface DashboardSummary {
  totals: {
    they_owe_me: number;
    i_owe_them: number;
  };
  outstanding: {
    they_owe_me: number;
    i_owe_them: number;
    net_balance: number;
  };
  counts: {
    pending: number;
    partial: number;
    paid: number;
    total: number;
  };
  contacts_count: number;
  upcoming_due: Array<{
    id: string;
    amount: number;
    currency: string;
    direction: string;
    due_date: string;
    status: string;
    contact_name: string;
  }>;
}

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    payments,
    loading: paymentsLoading,
    error: paymentsError,
  } = useRecentPayments();

  const [user, setUser] = useState<User | null>(null);

  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [tjsTotals, setTjsTotals] = useState({
  owesMe: 0,
  iOwe: 0,
  netTotal: 0,
});
  useEffect(() => {
    const controller = new AbortController();

    const getDashboardData = async () => {
      const debtsResponse = await axiosRequest.get<
  {
    id: string;
    amount: number;
    currency: string;
    direction: "they_owe_me" | "i_owe_them";
  }[]
>("/api/debts", {
  signal: controller.signal,
});

const tjsDebts = debtsResponse.data.filter(
  (debt) => debt.currency === "TJS"
);

const debtsWithPayments = await Promise.all(
  tjsDebts.map(async (debt) => {
    const response = await axiosRequest.get<
      { amount: number }[]
    >(`/api/debts/${debt.id}/payments`, {
      signal: controller.signal,
    });

    const paid = response.data.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0
    );

    return {
      ...debt,
      remaining: Math.max(0, Number(debt.amount) - paid),
    };
  })
);

const owesMe = debtsWithPayments
  .filter((debt) => debt.direction === "they_owe_me")
  .reduce((sum, debt) => sum + debt.remaining, 0);

const iOwe = debtsWithPayments
  .filter((debt) => debt.direction === "i_owe_them")
  .reduce((sum, debt) => sum + debt.remaining, 0);

if (!controller.signal.aborted) {
  setTjsTotals({
    owesMe,
    iOwe,
    netTotal: owesMe - iOwe,
  });
}
      try {
        setLoading(true);
        setError("");

        const [userResponse, summaryResponse] =
          await Promise.all([
            axiosRequest.get<User>("/api/users/me", {
              signal: controller.signal,
            }),
            axiosRequest.get<DashboardSummary>(
              "/api/dashboard/summary",
              {
                signal: controller.signal,
              }
            ),
          ]);

        if (controller.signal.aborted) return;

        setUser(userResponse.data);
        setSummary(summaryResponse.data);
      } catch (err: unknown) {
        if (controller.signal.aborted) return;

        if (
          axios.isAxiosError(err) &&
          err.response?.status === 401
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");

          navigate("/login", { replace: true });
          return;
        }

        setError("Не удалось загрузить данные Dashboard.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void getDashboardData();

    return () => controller.abort();
  }, [navigate]);

  return (
    <div className="min-h-screen min-w-0 bg-[#f8f9fc]">
      <DashboardHeader />

      <main className="px-5 pb-12 pt-4 md:px-8">
        <h1 className="mb-12 text-[30px] font-bold text-[#202936]">
          Welcome, {user?.name ?? "User"}!
        </h1>

        {loading && (
          <div className="flex min-h-[250px] items-center justify-center">
            <CircularProgress />
          </div>
        )}

        {!loading && error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!loading && !error && summary && (
          <>
           <SummaryCards
  netTotal={tjsTotals.netTotal}
  owesMe={tjsTotals.owesMe}
  iOwe={tjsTotals.iOwe}
/>

            <div className="mt-16 grid min-w-0 grid-cols-1 gap-7 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <div className="min-w-0">
                <DebtChart />
              </div>

              <div className="min-w-0">
                {paymentsLoading ? (
                  <div className="flex h-[350px] items-center justify-center rounded-3xl bg-white">
                    <p className="text-gray-400">
                      Загрузка платежей...
                    </p>
                  </div>
                ) : paymentsError ? (
                  <div className="flex h-[350px] items-center justify-center rounded-3xl bg-white">
                    <p className="text-red-500">
                      {paymentsError}
                    </p>
                  </div>
                ) : (
                  <RecentPayments payments={payments} />
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <Fab
        aria-label="Add"
        onClick={() => navigate("/debts")}
        sx={{
          position: "fixed",
          right: 30,
          bottom: 30,
          width: 70,
          height: 70,
          backgroundColor: "#437eff",
          color: "#ffffff",
          zIndex: 1000,
          "&:hover": {
            backgroundColor: "#3263e5",
          },
        }}
      >
        <AddRoundedIcon sx={{ fontSize: 32 }} />
      </Fab>
    </div>
  );
};

export default Dashboard;