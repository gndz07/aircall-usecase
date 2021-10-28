import { CircularProgress } from "@material-ui/core";
import "./loading-spinner.css";

export default function LoadingSpinner() {
    return (
        <div className="loading-container">
            <CircularProgress />
        </div>
    )
};