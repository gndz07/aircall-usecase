import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../../actions";
import logo from "../../assets/aircall-logo.png";
import { RootState } from "../../reducers";

export default function Dashboard() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (user) {
            dispatch(Actions.Calls.GetCalls.request({offset, limit: 15}));
        }
    }, []);

    return (
        <div>
            Hello {user.user.username}
        </div>
    )
};