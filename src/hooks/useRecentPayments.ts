import { useEffect, useState } from "react";
import { axiosRequest } from "../utils/token";
import type { Payment } from "../dashboard/RecentPayments";

interface Debt {
  id: string;
  contact_id: string;
  direction: "they_owe_me" | "i_owe_them";
  currency: string;
}

interface Contact {
  id: string;
  name: string;
}

interface ApiPayment {
  id: string;
  debt_id: string;
  amount: number;
  paid_at: string;
}

export const useRecentPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getPayments = async () => {
      try {
        setLoading(true);
        setError("");

        const [debtsResponse, contactsResponse] = await Promise.all([
          axiosRequest.get<Debt[]>("/api/debts", {
            signal: controller.signal,
          }),
          axiosRequest.get<Contact[]>("/api/contacts", {
            signal: controller.signal,
          }),
        ]);

        const debts = debtsResponse.data;
        const contacts = contactsResponse.data;

        const paymentResponses = await Promise.all(
          debts.map((debt) =>
            axiosRequest.get<ApiPayment[]>(
              `/api/debts/${debt.id}/payments`,
              { signal: controller.signal }
            )
          )
        );

        const allPayments: Payment[] = paymentResponses.flatMap(
          (response, index) => {
            const debt = debts[index];

            const contact = contacts.find(
              (item) => item.id === debt.contact_id
            );

            return response.data.map((payment) => ({
              id: payment.id,
              name: contact?.name ?? "Без имени",
              amount: Number(payment.amount),
              date: payment.paid_at,
              type:
                debt.direction === "they_owe_me"
                  ? "incoming"
                  : "outgoing",
            }));
          }
        );

        allPayments.sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );

        if (!controller.signal.aborted) {
          setPayments(allPayments.slice(0, 5));
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError("Не удалось загрузить платежи");
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void getPayments();

    return () => controller.abort();
  }, []);

  return { payments, loading, error };
};