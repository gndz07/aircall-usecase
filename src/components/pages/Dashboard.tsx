import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Actions from "../../actions";
import { RootState } from "../../reducers";
import MUIDataTable from "mui-datatables";
import "./dashboard.css";

export default function Dashboard() {
    const dispatch = useDispatch();
    let history = useHistory();
    const [selectedCall, setSelectedCalls] = useState(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const callsDataStatus = useSelector((state: RootState) => state.calls?.calls);
    const calls = useSelector((state: RootState) => state.calls?.calls?.nodes);

    const columns = ["From", "To", "Direction", "Call type"];

    const callsData = useMemo(() => {
        if (calls) {
            const compiledData = [];
            calls.forEach(call => {
                const data = [call.from, call.to, call.direction, call.call_type];
                compiledData.push(data);
            });
            return compiledData;
        }
    }, [calls]);

    const handleSelectCall = (index) => {
        history.push(`/call/${calls[index].id}`);
    };

    const options = {
        filter: false,
        download: false,
        selectableRowsHideCheckboxes: true,
        selectableRowsHeader: false,
        print: false,
        viewColumns: false,
        rowsPerPage: 10,
        onRowClick: (rowData, rowMeta) => {
            console.log(rowData, rowMeta);
            handleSelectCall(rowMeta?.rowIndex)
        }
    };

    useEffect(() => {
        if (user && calls.length == 0) {
            dispatch(Actions.Calls.GetCalls.request({offset: 0}));
        }
    }, []);

    //fetch next page if it still has next page
    useEffect(() => {
        if (calls) {
            if (callsDataStatus?.hasNextPage) {
                dispatch(Actions.Calls.GetCalls.request({offset: calls.length}));
            }
        }
    }, [calls]);

    return (
        <div className="content-container">
            <h1>Hello {user.user.username}</h1>

            <MUIDataTable
	        	title={"Call Logs"}
		        data={callsData}
		        columns={columns}
		        options={options}
		    />
        </div>
    )
};