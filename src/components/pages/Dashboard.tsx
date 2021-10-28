import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Actions from "../../actions";
import { RootState } from "../../reducers";
import MUIDataTable from "mui-datatables";
import "./dashboard.css";
import LoadingSpinner from "../LoadingSpinner";

export default function Dashboard() {
    const dispatch = useDispatch();
    let history = useHistory();
    const user = useSelector((state: RootState) => state.auth.user);
    const callsDataStatus = useSelector((state: RootState) => state.calls);
    const calls = useSelector((state: RootState) => state.calls?.calls?.nodes);

    const columns = [
        "Date",
        {
            name: "from",
            label: "From",
            options: {
             filter: false,
             sort: true,
            }
        }, 
        {
            name: "to",
            label: "To",
            options: {
             filter: false,
             sort: true,
            }
        },
        "Direction",
        "Call type",
        {
            name: "id",
            label: "Id",
            options: {
             display: "excluded",
             filter: false
            }
        }
    ];

    const callsData = useMemo(() => {
        if (calls) {
            const compiledData = [];
            calls.forEach(call => {
                const data = [call.created_at.split("T")[0], call.from, call.to, call.direction, call.call_type, call.id];
                compiledData.push(data);
            });
            return compiledData;
        }
    }, [calls]);

    const handleSelectCall = (id) => {
        history.push(`/call/${id}`);
    };

    const options = {
        download: false,
        selectableRowsHideCheckboxes: true,
        print: false,
        viewColumns: false,
        rowsPerPage: 10,
        onRowClick: (rowData, rowMeta) => {
            handleSelectCall(rowData[5]);
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
            if (callsDataStatus?.calls?.hasNextPage) {
                dispatch(Actions.Calls.GetCalls.request({offset: calls.length}));
            }
        }
    }, [calls]);

    return (
        <div className="content-container">
            {callsDataStatus.fetching ? 
                <LoadingSpinner />
            :

                <>
                    <h1>Hello {user.user.username}</h1>

                    <MUIDataTable
                        title={"Call Logs"}
                        data={callsData}
                        columns={columns}
                        options={options}
                    />
                </>
            }
        </div>
    )
};