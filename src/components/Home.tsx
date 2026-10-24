
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  MenuBookRounded,
  GroupsRounded,
  AccountBalanceWalletRounded,
  ShieldRounded,
  LanguageRounded,
  PersonAddAlt1Rounded,
  PostAddRounded,
  BarChartRounded,
  CheckCircleRounded,
} from "@mui/icons-material";

import { useTranslation } from "react-i18next";

import Footer from "./Footer";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNavigate } from "react-router-dom";

const image = "https://www.adl5-8.tj/adl5-8-logo.svg";

const Home = () => {
  const { t } = useTranslation();

  const texts = [
    t("badges.offline"),
    t("badges.languages"),
    t("badges.sync"),
    t("badges.security"),
  ];

  const features = [
    {
      icon: <MenuBookRounded />,
      title: t("features.book.title", {
        defaultValue: "Книга долгов",
      }),
      description: t("features.book.description", {
        defaultValue:
          "Записывайте каждую операцию с точностью. Отслеживайте, кто должен вам и кому вы должны — в одном интерфейсе.",
      }),
      color: "#437eff",
      bg: "#e0e9ff",
    },
    {
      icon: <GroupsRounded />,
      title: t("features.contacts.title", {
        defaultValue: "Менеджер контактов",
      }),
      description: t("features.contacts.description", {
        defaultValue:
          "Организуйте контакты с детальными профилями. Привязывайте долги к людям для мгновенной ясности.",
      }),
      color: "#28ae80",
      bg: "#e0f0ed",
    },
    {
      icon: <AccountBalanceWalletRounded />,
      title: t("features.offline.title", {
        defaultValue: "Офлайн-режим",
      }),
      description: t("features.offline.description", {
        defaultValue:
          "Работает без интернета. Данные хранятся локально и синхронизируются автоматически при подключении.",
      }),
      color: "#f59e0b",
      bg: "#fff1e1",
    },
    {
      icon: <BarChartRounded />,
      title: t("features.analytics.title", {
        defaultValue: "Аналитика",
      }),
      description: t("features.analytics.description", {
        defaultValue:
          "Наглядные панели, показывающие тренды долгов, историю платежей и остатки на одном экране.",
      }),
      color: "#f05276",
      bg: "#ffe5ed",
    },
    {
      icon: <ShieldRounded />,
      title: t("features.security.title", {
        defaultValue: "Безопасность",
      }),
      description: t("features.security.description", {
        defaultValue:
          "JWT-аутентификация, шифрование данных и контроль доступа по ролям защищают вашу финансовую информацию.",
      }),
      color: "#7957ff",
      bg: "#eae5ff",
    },
    {
      icon: <LanguageRounded />,
      title: t("features.multilingual.title", {
        defaultValue: "Многоязычность",
      }),
      description: t("features.multilingual.description", {
        defaultValue:
          "Используйте DebtBook на английском, русском или таджикском. Переключайте языки без потери данных.",
      }),
      color: "#26c6da",
      bg: "#dff7fc",
    },
  ];

  const statistics = [
    {
      value: "10K+",
      title: t("statistics.users.title", {
        defaultValue: "Активных пользователей",
      }),
      description: t("statistics.users.description", {
        defaultValue: "управляют долгами ежедневно",
      }),
    },
    {
      value: "50K+",
      title: t("statistics.debts.title", {
        defaultValue: "Долгов отслежено",
      }),
      description: t("statistics.debts.description", {
        defaultValue: "по всем счетам",
      }),
    },
    {
      value: "99.9%",
      title: t("statistics.availability.title", {
        defaultValue: "Доступность",
      }),
      description: t("statistics.availability.description", {
        defaultValue: "надёжно и всегда на связи",
      }),
    },
    {
      value: "3",
      title: t("statistics.languages.title", {
        defaultValue: "Языка",
      }),
      description: "EN · RU · TG",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: <PersonAddAlt1Rounded />,
      title: t("steps.account.title", {
        defaultValue: "Создайте аккаунт",
      }),
      description: t("steps.account.description", {
        defaultValue:
          "Регистрация за секунды. Банковская карта не нужна. Ваши данные остаются на устройстве с возможностью облачной синхронизации.",
      }),
    },
    {
      number: "02",
      icon: <PostAddRounded />,
      title: t("steps.debts.title", {
        defaultValue: "Добавьте долги",
      }),
      description: t("steps.debts.description", {
        defaultValue:
          "Записывайте долги с контактами, суммами, датами и заметками. Организуйте их в папки для удобства.",
      }),
    },
    {
      number: "03",
      icon: <BarChartRounded />,
      title: t("steps.progress.title", {
        defaultValue: "Отслеживайте прогресс",
      }),
      description: t("steps.progress.description", {
        defaultValue:
          "Контролируйте платежи, просматривайте аналитику и получайте информацию о ваших финансовых отношениях.",
      }),
    },
    {
      number: "04",
      icon: <CheckCircleRounded />,
      title: t("steps.organized.title", {
        defaultValue: "Оставайтесь организованными",
      }),
      description: t("steps.organized.description", {
        defaultValue:
          "Отмечайте долги как погашенные, экспортируйте отчёты и ведите чёткий учёт всех операций.",
      }),
    },
  ];
 const navigate = useNavigate();
  
  return (

    <>
   
      <header className="relative z-50 mx-auto flex h-[92px] max-w-[1850px] items-center justify-between bg-[#f1f5fb] px-6 md:px-12">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <img
              src={image}
              alt="Adl 5:8"
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <span className="text-[28px] font-extrabold tracking-tight text-[#191f38]">
            Adl 5:8
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-lg text-[#7c8193] md:flex">
          <LanguageSwitcher />

          <Button
            sx={{
              color: "#7c8193",
              fontSize: "18px",
              textTransform: "none",
            }}
          >
            {t("header.registration")}
          </Button>
<Button
  variant="outlined"
  onClick={() => navigate("/login")}
  sx={{
    color: "#191f38",
    borderColor: "#c2cada",
    backgroundColor: "#edf2ff",
    borderRadius: "16px",
    padding: "10px 25px",
    fontSize: "18px",
    textTransform: "none",

    "&:hover": {
      backgroundColor: "#e1e9ff",
      borderColor: "#aebbd5",
    },
  }}
>
  {t("header.login")}
</Button>
        </nav>
      </header>

      <main className="bg-[#f1f5fb]">
  
        <section className="relative z-10 mx-auto mt-[-70px] flex max-w-[1600px] flex-col items-center px-5 pb-24 pt-20 text-center md:pt-32">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#ccdcff] bg-[#edf2ff]/80 px-6 py-3 text-xs font-medium uppercase tracking-wide text-[#7a8195] sm:text-base">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4380ff]" />
            {t("hero.badge")}
          </div>

          <h1 className="mt-12 text-[clamp(42px,6.3vw,120px)] font-extrabold leading-[1.16] tracking-[-0.055em] text-[#191e36]">
            {t("hero.title1")}
            <br />
            <span className="bg-gradient-to-r from-[#2763eb] via-[#4e81ff] to-[#e69510] bg-clip-text text-transparent">
              {t("hero.title2")}
            </span>
          </h1>

          <p className="mt-10 max-w-[1020px] text-lg font-light leading-[1.8] text-[#878d9e] md:text-[27px]">
            {t("hero.description")}
          </p>

          <div className="mt-14 flex flex-col items-center gap-6 sm:flex-row">
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                minHeight: "76px",
                padding: "0 40px",
                borderRadius: "18px",
                background:
                  "linear-gradient(90deg, #437eff, #3263e5)",
                fontSize: "20px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow:
                  "0 12px 35px rgba(52,105,234,0.25)",
              }}
            >
              {t("hero.start")}
            </Button>

            <Button
              variant="text"
              sx={{
                color: "#83899a",
                fontSize: "20px",
                textTransform: "none",
                padding: "16px",
              }}
            >
              {t("hero.account")}
            </Button>
          </div>
        </section>

      
        <section>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
            {texts.map((text, index) => (
              <span
                key={index}
                className="rounded-xl border border-[#dce0e9] bg-[#f3f5fa]/80 px-5 py-2.5 text-sm text-[#9da3b3] sm:text-base"
              >
                {text}
              </span>
            ))}
          </div>
        </section>

       
        <section className="mt-[50px] bg-[#f1f5fb] px-5 py-24 md:px-10">
          <div className="mx-auto max-w-[1760px]">
            <h2 className="mb-24 text-center text-[40px] font-extrabold leading-[1.15] tracking-tight text-[#191e36] md:text-[68px]">
              {t("features.heading1", {
                defaultValue: "Всё, что нужно для",
              })}
              <br />
              <span className="text-[#a2a8b4]">
                {t("features.heading2", {
                  defaultValue: "управления долгами",
                })}
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="min-h-[330px] rounded-[24px] border border-[#dce3ed] bg-[#eaf0f8]/70 p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="mb-9 flex h-[70px] w-[70px] items-center justify-center rounded-[18px]"
                    style={{
                      color: item.color,
                      backgroundColor: item.bg,
                    }}
                  >
                    <div className="scale-125">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="mb-7 text-[25px] font-bold tracking-tight text-[#191e36]">
                    {item.title}
                  </h3>

                  <p className="text-[18px] leading-[1.9] text-[#a4abba]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

     
        <section className="bg-[#f1f5fb] px-6 py-28 md:py-40">
          <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center text-center ${
                  index !== 0
                    ? "lg:border-l lg:border-[#dce2ec]"
                    : ""
                }`}
              >
                <h2 className="text-[64px] font-extrabold leading-none tracking-[-0.06em] text-[#3d435b] md:text-[80px]">
                  {item.value}
                </h2>

                <h3 className="mt-5 text-lg font-medium text-[#60677b] md:text-[21px]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm text-[#aeb5c3] md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f1f5fb] px-5 py-28 md:px-10">
          <div className="mx-auto max-w-[1760px]">
            <p className="mb-8 text-center text-sm font-bold uppercase tracking-[0.3em] text-[#f59e0b] md:text-base">
              {t("steps.label", {
                defaultValue: "Как это работает",
              })}
            </p>

            <h2 className="mb-28 text-center text-[40px] font-extrabold leading-tight tracking-[-0.04em] text-[#191e36] md:text-[68px]">
              {t("steps.heading1", {
                defaultValue: "Начните за",
              })}{" "}
              <span className="text-[#a3a9b6]">
                {t("steps.heading2", {
                  defaultValue: "четыре простых шага",
                })}
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative min-h-[370px] rounded-[24px] border border-[#dce3ed] bg-[#eaf0f8]/70 p-10"
                >
                  <div className="mb-11 flex items-start justify-between">
                    <span className="text-[64px] font-extrabold leading-none tracking-tight text-[#dce2ee]">
                      {step.number}
                    </span>

                    <div className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl border border-[#d5e1ff] bg-[#e2ebff] text-[#437eff]">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="mb-5 text-[24px] font-bold leading-9 tracking-tight text-[#191e36]">
                    {step.title}
                  </h3>

                  <p className="text-[18px] leading-[1.85] text-[#a1a9b8]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

    
        <section className="bg-[#f1f5fb] px-5 py-28 md:px-10">
          <div className="mx-auto max-w-[1420px] rounded-[34px] border border-[#d7e3ff] bg-[#eaf0ff]/70 px-6 py-20 text-center md:px-16 md:py-24">
            <h2 className="text-[40px] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#191e36] md:text-[68px]">
              {t("cta.heading1", {
                defaultValue: "Готовы взять контроль",
              })}
              <br />
              <span className="text-[#a2a9b9]">
                {t("cta.heading2", {
                  defaultValue: "над финансами?",
                })}
              </span>
            </h2>

            <p className="mx-auto mt-12 max-w-[750px] text-lg leading-[1.8] text-[#a1aabb] md:text-[23px]">
              {t("cta.description", {
                defaultValue:
                  "Присоединяйтесь к тысячам пользователей, которые доверяют DebtBook ведение своих финансовых записей.",
              })}
            </p>

            <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  minHeight: "76px",
                  padding: "0 46px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(90deg, #437eff, #3263e5)",
                  fontSize: "20px",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                {t("hero.start")}
              </Button>

              <Button
                variant="outlined"
                sx={{
                  minHeight: "76px",
                  minWidth: "160px",
                  padding: "0 40px",
                  borderRadius: "18px",
                  borderColor: "#cbd5e5",
                  color: "#747d91",
                  fontSize: "20px",
                  textTransform: "none",
                }}
              >
                {t("header.login")}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
