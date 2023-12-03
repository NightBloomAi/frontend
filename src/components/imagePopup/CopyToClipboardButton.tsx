import { IconButton, Snackbar, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";

type Props = {
    icon: React.ReactNode;
    tooltip?: string;
    snackbarMessage?: string;
    disabled?: boolean;
    onClick?: () => void;
};

const CopyToClipboardButton: React.FC<Props> = ({
    icon,
    tooltip,
    snackbarMessage,
    disabled,
    onClick,
}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
        onClick && onClick();
    };

    return (
        <Fragment>
            <Tooltip title={tooltip ?? "Copy to clibboard"}>
                <IconButton
                    onClick={handleClick}
                    color="primary"
                    disabled={disabled}
                >
                    {icon}
                </IconButton>
            </Tooltip>
            <Snackbar
                message={snackbarMessage ?? "Copied to clibboard"}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                open={open}
            />
        </Fragment>
    );
};

export default CopyToClipboardButton;
