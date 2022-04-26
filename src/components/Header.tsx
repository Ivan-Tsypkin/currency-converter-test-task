import { 
    AppBar, 
    FormControl, 
    MenuItem, 
    Select, 
    SelectChangeEvent, 
    Toolbar, 
    Typography 
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { useTranslation } from 'react-i18next';
  
  const Header: React.FC = () => {
    const [lang, setLang] = useState("ru");
    const { t, i18n } = useTranslation();

    const currentLang = localStorage.getItem("currentLang") || "ru"

    useEffect(() => {
      i18n.changeLanguage(currentLang);
      setLang(currentLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const handleLangChange = (event: SelectChangeEvent) => {
      setLang(event.target.value);
      localStorage.setItem("currentLang", event.target.value);
      i18n.changeLanguage(event.target.value);
    }
  
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("header")}
          </Typography>
          <FormControl 
            sx={{ width: "100%", maxWidth: "80px", m: 1 }}
            hiddenLabel
          >
            <Select
              value={lang}
              onChange={handleLangChange}
              sx={{ color: "white" }}
            >
              <MenuItem value={"ru"}>RU</MenuItem>
              <MenuItem value={"en"}>EN</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Header;