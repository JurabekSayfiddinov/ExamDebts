
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";

export interface Payment {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: "incoming" | "outgoing";
}

interface RecentPaymentsProps {
  payments: Payment[];
}

const RecentPayments = ({
  payments,
}: RecentPaymentsProps) => {
  return (
    <div className="flex h-[670px] flex-col overflow-hidden rounded-[20px] border border-[#e7edf4] bg-white">
      <div className="border-b border-[#e7edf4] px-7 py-8">
        <h2 className="text-[20px] font-bold text-[#25303c]">
          Recent Payments
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-7 py-5">
        {payments.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <PaymentsRoundedIcon
              sx={{
                fontSize: 48,
                color: "#cbd5e1",
              }}
            />

            <p className="text-gray-400">
              No recent payments
            </p>
          </div>
        ) : (
          payments.map((payment) => {
            const incoming = payment.type === "incoming";

            return (
              <div
                key={payment.id}
                className="flex items-center justify-between gap-3 border-b border-[#edf1f5] py-4 last:border-0"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                      incoming
                        ? "bg-[#e9f8f2] text-[#29b486]"
                        : "bg-[#ffe9e9] text-[#ef3138]"
                    }`}
                  >
                    <PaymentsRoundedIcon />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-[#25303c]">
                      {payment.name}
                    </h3>

                    <p className="mt-2 text-sm text-[#7e8c9d]">
                      {payment.date}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p
                    className={`text-xl font-semibold ${
                      incoming
                        ? "text-[#28ae80]"
                        : "text-[#ef3138]"
                    }`}
                  >
                    {incoming ? "+" : "-"}
                    {payment.amount.toLocaleString("ru-RU")}
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full border px-3 py-0.5 text-sm ${
                      incoming
                        ? "border-[#9cdec4] text-[#28ae80]"
                        : "border-[#ffadad] text-[#ef3138]"
                    }`}
                  >
                    {incoming ? "Incoming" : "Outgoing"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentPayments;
