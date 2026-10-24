
import {
  AccountBalanceWalletRounded,
  PaymentsRounded,
  CreditCardRounded,
} from "@mui/icons-material";

import type { ReactNode } from "react";

interface SummaryCardsProps {
  netTotal: number;
  owesMe: number;
  iOwe: number;
  currency?: string;
}

interface CardData {
  title: string;
  value: number;
  color: string;
  bg: string;
  icon: ReactNode;
  highlight?: boolean;
}

const SummaryCards = ({
  netTotal,
  owesMe,
  iOwe,
  currency = "TJS",
}: SummaryCardsProps) => {
  const cards: CardData[] = [
    {
      title: "Net Total",
      value: netTotal,
      color: "#ed8a00",
      bg: "#f7e9db",
      icon: <AccountBalanceWalletRounded />,
      highlight: true,
    },
    {
      title: "Owes Me",
      value: owesMe,
      color: "#2bb082",
      bg: "#e3f5ed",
      icon: <PaymentsRounded />,
    },
    {
      title: "I Owe",
      value: iOwe,
      color: "#e3272e",
      bg: "#ffe3e2",
      icon: <CreditCardRounded />,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`flex min-h-[175px] items-center justify-between rounded-[32px] border bg-white p-7 ${
            card.highlight
              ? "border-[#27b884]"
              : "border-[#edf0f5]"
          }`}
        >
    
          <div
            className="flex h-[70px] w-[70px] items-center justify-center rounded-[22px]"
            style={{
              backgroundColor: card.bg,
              color: card.color,
            }}
          >
            {card.icon}
          </div>

     
          <div className="text-right">
            <h3 className="mb-5 text-[20px] font-semibold text-[#667786]">
              {card.title}
            </h3>

            <div className="flex items-baseline justify-end gap-2">
              <span
                className="text-[33px] font-bold"
                style={{ color: card.color }}
              >
                {card.value.toLocaleString("ru-RU")}
              </span>

              <span className="text-[20px] font-medium text-[#667786]">
                {currency}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SummaryCards;
