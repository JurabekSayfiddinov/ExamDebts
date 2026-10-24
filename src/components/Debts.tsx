import { useEffect, useMemo, useState } from "react";
import { axiosRequest } from "../utils/token";

import {
  Button,
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";

import {
  AddRounded,
  DownloadRounded,
  SearchRounded,
  FilterListRounded,
  SwapVertRounded,
  MoreVertRounded,
  CalendarMonthOutlined,
  AccountBalanceWalletRounded,
  PaymentsRounded,
  MenuRounded,
} from "@mui/icons-material";
import DashboardHeader from "@/dashboard/DashboardHeader";
import AddDebtDialog from "@/dashboard/AddDebtDialog";

type Direction = "they_owe_me" | "i_owe_them";

interface Debt {
  id: string;
  contact_id: string;
  direction: Direction;
  amount: number;
  currency: string;
  due_date: string | null;
  created_at: string;
  status: "pending" | "partial" | "paid";
}

interface Contact {
  id: string;
  name: string;
  folder_id: string | null;
}

interface Folder {
  id: string;
  name: string;
}

interface DebtPayment {
  id: string;
  amount: number;
}

type DebtRow = Debt & {
  paidAmount: number;
};

const money = (amount: number) =>
  amount.toLocaleString("ru-RU", {
    maximumFractionDigits: 2,
  });

const Debts = () => {
    const [openAddDebt, setOpenAddDebt] = useState(false);
const [refreshKey, setRefreshKey] = useState(0);
  const [debts, setDebts] = useState<DebtRow[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

  const [search, setSearch] = useState("");
  const [contactFilter, setContactFilter] = useState("all");
  const [folderFilter, setFolderFilter] = useState("all");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [descending, setDescending] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadDebts = async () => {
      try {
        setLoading(true);
        setError("");

        const [debtsRes, contactsRes, foldersRes] =
          await Promise.all([
            axiosRequest.get<Debt[]>("/api/debts", {
              signal: controller.signal,
            }),
            axiosRequest.get<Contact[]>("/api/contacts", {
              signal: controller.signal,
            }),
            axiosRequest.get<Folder[]>("/api/folders", {
              signal: controller.signal,
            }),
          ]);

        const debtsWithPayments = await Promise.all(
          debtsRes.data.map(async (debt) => {
            const res = await axiosRequest.get<DebtPayment[]>(
              `/api/debts/${debt.id}/payments`,
              { signal: controller.signal }
            );

            const paidAmount = res.data.reduce(
              (sum, payment) => sum + Number(payment.amount),
              0
            );

            return {
              ...debt,
              paidAmount,
            };
          })
        );

        if (!controller.signal.aborted) {
          setDebts(debtsWithPayments);
          setContacts(contactsRes.data);
          setFolders(foldersRes.data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError("Не удалось загрузить данные");
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadDebts();

    return () => controller.abort();
  }, [refreshKey]);

  const getContact = (id: string) =>
    contacts.find((contact) => contact.id === id);

const filteredDebts = useMemo(() => {
  return debts
    .filter((debt) => {
      if (debt.currency !== "TJS") {
        return false;
      }

      const contact = contacts.find(
        (item) => item.id === debt.contact_id
      );

      const matchesSearch = (contact?.name ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesContact =
        contactFilter === "all" ||
        debt.contact_id === contactFilter;

      const matchesFolder =
        folderFilter === "all" ||
        contact?.folder_id === folderFilter;

      const matchesDirection =
        directionFilter === "all" ||
        debt.direction === directionFilter;

      return (
        matchesSearch &&
        matchesContact &&
        matchesFolder &&
        matchesDirection
      );
    })
    .sort((a, b) =>
      descending
        ? b.created_at.localeCompare(a.created_at)
        : a.created_at.localeCompare(b.created_at)
    );
}, [
  debts,
  contacts,
  search,
  contactFilter,
  folderFilter,
  directionFilter,
  descending,
]);

  const totals = useMemo(() => {
    const result: Record<
      string,
      { owesMe: number; iOwe: number }
    > = {};

    debts.forEach((debt) => {
      const currency = debt.currency;

      if (!result[currency]) {
        result[currency] = {
          owesMe: 0,
          iOwe: 0,
        };
      }

      const remaining = Math.max(
        0,
        Number(debt.amount) - debt.paidAmount
      );

      if (debt.direction === "they_owe_me") {
        result[currency].owesMe += remaining;
      } else {
        result[currency].iOwe += remaining;
      }
    });

    return result;
  }, [debts]);

const formatTotals = (
  type: "net" | "owesMe" | "iOwe"
) => {
  const value = totals["TJS"];

  if (!value) {
    return "0 TJS";
  }

  const amount =
    type === "net"
      ? value.owesMe - value.iOwe
      : value[type];

  return `${money(amount)} TJS`;
};

  return (
    <div className="min-h-screen bg-[#f8fafc] px-5 pb-16 pt-5 md:px-9">
      <div className="mx-auto max-w-[1600px]">
        <DashboardHeader/>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-5">
          <h1 className="text-[30px] font-bold text-[#28343f]">
            Adl 5:8
          </h1>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outlined"
              startIcon={<DownloadRounded />}
              onClick={() => window.print()}
              sx={{
                borderRadius: "25px",
                borderColor: "#e3e9ee",
                color: "#4d5c69",
                background: "white",
                textTransform: "none",
                px: 3,
              }}
            >
              Экспорт
            </Button>

            <Button
              variant="contained"
              startIcon={<PaymentsRounded />}
              sx={{
                borderRadius: "25px",
                background: "#437eff",
                textTransform: "none",
                px: 3,
                boxShadow: "none",
              }}
            >
              Быстрый платёж
            </Button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: "Чистый итог",
              value: formatTotals("net"),
              icon: <AccountBalanceWalletRounded />,
              color: "#ef9300",
              bg: "#fff0dc",
              border: "border-[#34bd8c]",
            },
            {
              title: "Мне должны",
              value: formatTotals("owesMe"),
              icon: <PaymentsRounded />,
              color: "#2bad83",
              bg: "#e4f7ef",
              border: "border-transparent",
            },
            {
              title: "Я должен",
              value: formatTotals("iOwe"),
              icon: <PaymentsRounded />,
              color: "#ed3434",
              bg: "#ffe7e7",
              border: "border-transparent",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`flex min-h-[160px] items-center justify-between rounded-[28px] border bg-white p-6 ${card.border}`}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  color: card.color,
                  backgroundColor: card.bg,
                }}
              >
                {card.icon}
              </div>

              <div className="text-right">
                <p className="mb-4 font-semibold text-[#758594]">
                  {card.title}
                </p>

                <p
                  className="text-[clamp(18px,2vw,30px)] font-bold"
                  style={{ color: card.color }}
                >
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-[#ebeff3] bg-white p-5">
          <TextField
            fullWidth
            placeholder="Поиск по имени"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <SearchRounded
                    sx={{
                      color: "#8494a2",
                      marginRight: 1.5,
                    }}
                  />
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
              },
            }}
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <Select
              size="small"
              value={contactFilter}
              onChange={(e) =>
                setContactFilter(e.target.value)
              }
              sx={{
                flex: 1,
                minWidth: 180,
                borderRadius: "15px",
              }}
            >
              <MenuItem value="all">Все контакты</MenuItem>

              {contacts.map((contact) => (
                <MenuItem
                  key={contact.id}
                  value={contact.id}
                >
                  {contact.name}
                </MenuItem>
              ))}
            </Select>

            <Select
              size="small"
              value={folderFilter}
              onChange={(e) =>
                setFolderFilter(e.target.value)
              }
              sx={{
                flex: 1,
                minWidth: 180,
                borderRadius: "15px",
              }}
            >
              <MenuItem value="all">Все папки</MenuItem>

              {folders.map((folder) => (
                <MenuItem key={folder.id} value={folder.id}>
                  {folder.name}
                </MenuItem>
              ))}
            </Select>

            <Tooltip title="Фильтр по типу долга">
              <IconButton
                onClick={() =>
                  setDirectionFilter((current) =>
                    current === "all"
                      ? "they_owe_me"
                      : current === "they_owe_me"
                        ? "i_owe_them"
                        : "all"
                  )
                }
                sx={{
                  border: "1px solid #e4eaf0",
                  borderRadius: "15px",
                  color:
                    directionFilter === "all"
                      ? "#718391"
                      : "#437eff",
                }}
              >
                <FilterListRounded />
              </IconButton>
            </Tooltip>

            <Tooltip title="Изменить сортировку">
              <IconButton
                onClick={() => setDescending((value) => !value)}
                sx={{
                  border: "1px solid #e4eaf0",
                  borderRadius: "15px",
                }}
              >
                <SwapVertRounded />
              </IconButton>
            </Tooltip>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[#f7f9fa] text-sm text-[#718391]">
                <tr>
                  <th className="px-6 py-5 font-medium">
                    ПОЛНОЕ ИМЯ
                  </th>
                  <th className="px-6 py-5 font-medium">
                    СУММА
                  </th>
                  <th className="px-6 py-5 font-medium">
                    ПРОГРЕСС
                  </th>
                  <th className="px-6 py-5 font-medium">
                    ДАТА ПОГАШЕНИЯ
                  </th>
                  <th className="px-4 py-5" />
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-14 text-center text-gray-400"
                    >
                      Загрузка...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-14 text-center text-red-500"
                    >
                      {error}
                    </td>
                  </tr>
                ) : filteredDebts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-14 text-center text-gray-400"
                    >
                      Долги не найдены
                    </td>
                  </tr>
                ) : (
                  filteredDebts.map((debt) => {
                    const progress =
                      Number(debt.amount) > 0
                        ? Math.min(
                            100,
                            (debt.paidAmount /
                              Number(debt.amount)) *
                              100
                          )
                        : 0;

                    const incoming =
                      debt.direction === "they_owe_me";

                    return (
                      <tr
                        key={debt.id}
                        className="border-b border-[#edf1f4] last:border-0"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ecf8f2] text-[#29aa83]">
                              <PaymentsRounded />
                            </div>

                            <span className="font-semibold text-[#35404c]">
                              {getContact(debt.contact_id)
                                ?.name ?? "Без имени"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`font-bold ${
                              incoming
                                ? "text-[#28ac80]"
                                : "text-[#ef4545]"
                            }`}
                          >
                            {incoming ? "+" : "-"}
                            {money(Number(debt.amount))}
                          </span>

                          <span className="ml-1 text-sm text-[#82919e]">
                            {debt.currency}
                          </span>
                        </td>

                        <td className="min-w-[220px] px-6 py-5">
                          <div className="mb-2 flex justify-between text-sm">
                            <span className="text-[#82919e]">
                              {money(debt.paidAmount)} paid
                            </span>

                            <span className="font-semibold text-[#28ac80]">
                              {Math.round(progress)}%
                            </span>
                          </div>

                          <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                              height: 5,
                              borderRadius: 5,
                              bgcolor: "#e6f2ee",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: "#28ac80",
                                borderRadius: 5,
                              },
                            }}
                          />
                        </td>

                        <td className="px-6 py-5 text-sm text-[#82919e]">
                          <div className="flex items-center gap-2">
                            <CalendarMonthOutlined fontSize="small" />

                            {debt.due_date
                              ? new Date(
                                  `${debt.due_date}T00:00:00`
                                ).toLocaleDateString("ru-RU")
                              : "—"}
                          </div>
                        </td>

                        <td className="px-4 py-5">
                          <IconButton size="small">
                            <MoreVertRounded />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

  <button
  type="button"
  aria-label="Добавить долг"
  onClick={() => setOpenAddDebt(true)}
  className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#437eff] text-white shadow-[0_12px_30px_rgba(67,126,255,0.35)] transition hover:bg-[#3269ed]"
>
  <AddRounded sx={{ fontSize: 32 }} />
</button>
<AddDebtDialog
  open={openAddDebt}
  onClose={() => setOpenAddDebt(false)}
  onCreated={() => setRefreshKey((prev) => prev + 1)}
  contacts={contacts}
/>
    </div>
  );
};

export default Debts;