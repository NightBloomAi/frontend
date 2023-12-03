import { IconButton, Tooltip } from "@mui/material";
import { Fragment } from "react";
import toast from "react-hot-toast";

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
    /**
     * Handle click on copy to clipboard button
     */
    const handleClick = () => {
        toast.success(snackbarMessage ?? "Copied to clibboard");
        onClick && onClick();
    };

    return (
        <Fragment>
            <Tooltip title={tooltip ?? "Copy to clibboard"}>
                <IconButton
                    onClick={handleClick}
                    color="default"
                    disabled={disabled}
                >
                    {icon}
                </IconButton>
            </Tooltip>
        </Fragment>
    );
};

export default CopyToClipboardButton;
