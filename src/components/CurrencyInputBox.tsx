import { 
  Box, 
  FormControl, 
  MenuItem, 
  Select, 
  SelectChangeEvent, 
  TextField 
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface CurrencyInputBoxProps {
  amount: string,
  currency: string,
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleCurrencyChange : (event: SelectChangeEvent<string>, child: React.ReactNode) => void,
  inputLabel: string,
  currencies: string[],
  isInputError?: boolean,
}

const CurrencyInputBox: React.FC<CurrencyInputBoxProps> = ({ 
  amount, 
  handleAmountChange, 
  currency, 
  handleCurrencyChange,
  inputLabel, 
  currencies,
  isInputError,
}) => {

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 1,
        width: "100%",
        maxWidth: "320px"
      }}
    >
      <TextField 
        id="outlined-basic" 
        label={inputLabel} 
        variant="outlined" 
        value={amount}
        onChange={handleAmountChange}
        inputProps={
          { min: 0 }
        }
        error={isInputError}
        helperText={isInputError ? t("amountErrorText") : ""}
      />
      <FormControl 
        sx={{ width: "100%", maxWidth: "90px" }}
        hiddenLabel
      >
        <Select
          value={currency}
          onChange={handleCurrencyChange}
        >
          {currencies.map(currency => 
            <MenuItem key={currency} value={currency}>{currency}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CurrencyInputBox;