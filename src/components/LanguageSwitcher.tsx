
import { useTranslation } from "react-i18next";

import Select, {
  type SelectChangeEvent,
} from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type Language = "ru" | "en" | "tg";

const languages = [
  {
    code: "ru",
    label: "Русский",
    short: "RU",
  
  },
  {
    code: "en",
    label: "English",
    short: "EN",

  },
  {
    code: "tg",
    label: "Тоҷикӣ",
    short: "TJ",

  },
] as const;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage = (
    ["ru", "en", "tg"].includes(i18n.resolvedLanguage ?? "")
      ? i18n.resolvedLanguage
      : "ru"
  ) as Language;

  const handleChange = async (
    event: SelectChangeEvent<Language>
  ) => {
    const lang = event.target.value as Language;

    await i18n.changeLanguage(lang);

    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "4px 8px 4px 14px",
        borderRadius: "50px",
        border: "1px solid #d1ddf5",
        background:
          "linear-gradient(135deg, #f3f7ff, #e8efff)",
        transition: "all 0.3s ease",

        "&:hover": {
          borderColor: "#86a8ff",
          boxShadow:
            "0 5px 20px rgba(59, 112, 240, 0.12)",
        },
      }}
    >
      <TranslateRoundedIcon
        sx={{
          color: "#437eff",
          fontSize: "23px",
        }}
      />

      <Select<Language>
        value={currentLanguage}
        onChange={(event) => void handleChange(event)}
        variant="standard"
        disableUnderline
        size="small"
        IconComponent={KeyboardArrowDownRoundedIcon}
        inputProps={{ "aria-label": "Выбор языка" }}
        renderValue={(selected) => {
          const lang = languages.find(
            (item) => item.code === selected
          );

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Typography fontSize="20px">
                {lang?.flag}
              </Typography>

              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#283453",
                }}
              >
                {lang?.short}
              </Typography>
            </Box>
          );
        }}
        sx={{
          minWidth: "95px",
          color: "#283453",

          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            padding: "7px 28px 7px 0 !important",
          },

          "& .MuiSelect-icon": {
            color: "#8290ac",
            fontSize: "22px",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              marginTop: "12px",
              minWidth: "210px",
              padding: "8px",
              borderRadius: "18px",
              border: "1px solid #e2e8f5",
              backgroundColor: "#ffffff",
              boxShadow:
                "0 18px 45px rgba(25, 40, 85, 0.14)",
            },
          },
        }}
      >
        {languages.map((lang) => {
          const selected =
            currentLanguage === lang.code;

          return (
            <MenuItem
              key={lang.code}
              value={lang.code}
              sx={{
                borderRadius: "12px",
                padding: "12px",
                marginBottom: "4px",
                backgroundColor: selected
                  ? "#edf3ff"
                  : "transparent",

                "&:hover": {
                  backgroundColor: "#f0f5ff",
                },

                "&.Mui-selected": {
                  backgroundColor: "#edf3ff",
                },

                "&.Mui-selected:hover": {
                  backgroundColor: "#e3edff",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "12px",
                }}
              >
                <Typography fontSize="24px">
                  {lang.flag}
                </Typography>

                <Typography
                  sx={{
                    flex: 1,
                    fontSize: "16px",
                    fontWeight: selected ? 600 : 400,
                    color: selected
                      ? "#3263e5"
                      : "#283453",
                  }}
                >
                  {lang.label}
                </Typography>

                {selected && (
                  <CheckRoundedIcon
                    sx={{
                      color: "#3263e5",
                      fontSize: "21px",
                    }}
                  />
                )}
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export default LanguageSwitcher;
