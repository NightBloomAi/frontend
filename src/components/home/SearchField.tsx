import { useThemeContext } from "@/context/theme.context";
import { TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React from "react";

type Props = {
    searchInput: any;
    handleSearchOnChange: any;
};

const SearchField: React.FC<Props> = ({
    searchInput,
    handleSearchOnChange,
}) => {
    const { theme } = useThemeContext();

    return (
        <TextField
            placeholder="Type to search"
            value={searchInput}
            onChange={handleSearchOnChange}
            sx={{
                my: 2,
                width: {
                    xs: "100%",
                    sm: "70%",
                    md: "50%",
                    lg: "30%",
                    xl: "30%",
                },
                backgroundColor: theme.palette?.transGrey.main,
                borderRadius: 30,
                "& fieldset": {
                    borderStyle: "dashed",
                    borderColor: "transparent",
                },
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderWidth: 2.5,
                    },
                    "&:hover fieldset": {
                        borderWidth: 2.5,
                    },
                },
            }}
            InputProps={{
                style: {
                    borderRadius: 30,
                    borderStyle: "dashed",
                    borderColor: theme.palette.transGrey.main,
                    outlineColor: theme.palette.transGrey.main,
                    outline: "none",
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchRoundedIcon color={"secondary"} />
                    </InputAdornment>
                ),
                autoComplete: "off",
            }}
        />
    );
};

export default SearchField;
