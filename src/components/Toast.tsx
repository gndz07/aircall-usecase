import { IconButton, Snackbar, withStyles } from "@material-ui/core";
import Slide, { SlideProps } from "@material-ui/core/Slide";
import { Close as CloseIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

interface ToastProps {
	message?: any;
	visible?: any;
	type?: string;
	testID?: string;
}

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionUp(props: TransitionProps) {
	return <Slide {...props} direction="up" />;
}

const ErrorSnackbar = withStyles({
	anchorOriginBottomCenter: {},
	"@global": {
		".MuiSnackbarContent-root": {
			boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
			background: "linear-gradient(45deg, #d32f2f 30%, #ef5350 90%)",
			fontSize: "1rem",
		},
	},
})(Snackbar);

const SuccessSnackbar = withStyles({
	anchorOriginBottomCenter: {},
	"@global": {
		".MuiSnackbarContent-root": {
			boxShadow: "0 3px 5px 2px rgba(123, 255, 135, .3)",
			background: "linear-gradient(45deg, #388e3c 30%, #66bb6a 90%)",
			fontSize: "1rem",
		},
	},
})(Snackbar);


const Toast: React.FC<ToastProps> = ({ message, visible, type, testID }) => {
	const [open, setOpen] = useState(false);
	const [transition, setTransition] = useState<React.ComponentType<TransitionProps> | undefined>(undefined);
	useEffect(() => {
		if (open && type !== "warning")
			setTimeout(() => {
				setOpen(false);
			}, 3000);
	}, [open]);

	useEffect(() => {
		setTransition(() => TransitionUp);
		setOpen(visible);
	}, [visible]);

	const handleClose = (_?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	if (!visible) return null;
	return type == "success" ? (
		<SuccessSnackbar
			open={open}
			message={message}
			autoHideDuration={3000}
			TransitionComponent={transition}
			action={
				<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} style={{ zIndex: 100 }}>
					<CloseIcon fontSize="small" />
				</IconButton>
			}></SuccessSnackbar>
	) :  (
		<ErrorSnackbar
			open={open}
			message={message}
			autoHideDuration={3000}
			TransitionComponent={transition}
			style={{ zIndex: 100 }}
			action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
			}></ErrorSnackbar>
	);
};

export default Toast;
