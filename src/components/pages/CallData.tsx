import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import './login.css';
import Actions from "../../actions";

export default function CallData() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(Actions.Calls.GetCallData.request(id));
        }
    }, [id]);

    return (
        <div>
            Call ID: {id}
        </div>
    )
};