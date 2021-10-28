import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './call-data.css';
import Actions from "../../actions";
import { RootState } from "../../reducers";
import moment from "moment";
import CallDataList from "../CallDataList";
import LoadingSpinner from "../LoadingSpinner";

export default function CallData() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const calls = useSelector((state: RootState) => state.calls);
    console.log(calls.fetching);
    const selectedCall = useSelector((state: RootState) => state.calls?.selectedCall);
    const fetchCallData = useCallback((id) => dispatch(Actions.Calls.GetCallData.request(id)), [dispatch]);

    //convert call time to local time
    const callDate = selectedCall?.created_at;
    let dateInLocal = moment.utc(callDate).local().format("DD-MM-YYYY HH:mm:ss");

    useEffect(() => {
        if (id) {
            fetchCallData(id);
        }
    }, [id]);

    return (
        <div className="container">
            {calls.fetching ? 
                <LoadingSpinner />
            :
                (
                <>
                    <h1>Call details</h1>
                    <div className="data-container">
                        <CallDataList 
                            title="Call ID"
                            content={selectedCall?.id}
                        />
                        <CallDataList 
                            title="Date"
                            content={dateInLocal.split(" ")[0]}
                        />
                        <CallDataList 
                            title="Time"
                            content={dateInLocal.split(" ")[1]}
                        />
                        <CallDataList 
                            title="From"
                            content={selectedCall?.from}
                        />
                        <CallDataList 
                            title="To"
                            content={selectedCall?.to}
                        />
                        <CallDataList 
                            title="Via"
                            content={selectedCall?.via}
                        />
                        <CallDataList 
                            title="Direction"
                            content={selectedCall?.direction}
                        />
                        <CallDataList 
                            title="Call type"
                            content={selectedCall?.call_type}
                        />
                        <CallDataList 
                            title="Duration"
                            content={`${Math.ceil(selectedCall?.duration/1000)}s`}
                        />
                        <CallDataList 
                            title="Notes"
                            content={selectedCall?.notes}
                            contentType="list"
                        />
                    </div>
                </>
                )
            }
        </div>
    )
};