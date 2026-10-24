import { useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { axiosRequest } from "../utils/token";

interface Contact {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  contacts: Contact[];
}

const AddDebtDialog = ({
  open,
  onClose,
  onCreated,
  contacts,
}: Props) => {
  const [contactId, setContactId] = useState("");
  const [direction, setDirection] = useState<
    "they_owe_me" | "i_owe_them"
  >("they_owe_me");

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("TJS");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contactId || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setError("Выберите контакт и укажите правильную сумму");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axiosRequest.post("/api/debts", {
        contact_id: contactId,
        direction,
        amount: Number(amount),
        currency,
        description,
        ...(dueDate ? { due_date: dueDate } : {}),
      });

      setContactId("");
      setDirection("they_owe_me");
      setAmount("");
      setCurrency("TJS");
      setDescription("");
      setDueDate("");

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Не удалось добавить долг");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "24px",
            padding: "12px",
          },
        },
      }}
    >
      <div className="flex items-center justify-between px-3 pt-3">
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "25px",
            color: "#191f38",
          }}
        >
          Добавить долг
        </DialogTitle>

        <IconButton onClick={onClose} disabled={loading}>
          <CloseRoundedIcon />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="flex flex-col gap-5">
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              select
              required
              fullWidth
              label="Контакт"
              value={contactId}
              onChange={(e) => setContactId(e.target.value)}
            >
              {contacts.map((contact) => (
                <MenuItem key={contact.id} value={contact.id}>
                  {contact.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Тип долга"
              value={direction}
              onChange={(e) =>
                setDirection(
                  e.target.value as "they_owe_me" | "i_owe_them"
                )
              }
            >
              <MenuItem value="they_owe_me">
                Мне должны
              </MenuItem>

              <MenuItem value="i_owe_them">
                Я должен
              </MenuItem>
            </TextField>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField
                required
                fullWidth
                label="Сумма"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                slotProps={{
                  htmlInput: {
                    min: 0.01,
                    step: "0.01",
                  },
                }}
              />

              <TextField
                select
                fullWidth
                label="Валюта"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value="TJS">TJS</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="RUB">RUB</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </TextField>
            </div>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              fullWidth
              label="Дата погашения"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </div>
        </DialogContent>

        <DialogActions sx={{ padding: "20px 24px" }}>
          <Button
            onClick={onClose}
            disabled={loading}
            sx={{
              color: "#81909e",
              textTransform: "none",
            }}
          >
            Отмена
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading || contacts.length === 0}
            sx={{
              background: "#437eff",
              borderRadius: "12px",
              padding: "12px 30px",
              textTransform: "none",
            }}
          >
            {loading ? "Сохранение..." : "Добавить долг"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDebtDialog;