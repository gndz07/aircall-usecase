import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/call-data.css";
import Actions from "../../actions";
import { RootState } from "../../reducers";
import moment from "moment";
import CallDataList from "../CallDataList";
import LoadingSpinner from "../LoadingSpinner";
import { Modal } from "modal-for-react";
import { capitalizeFirstLetter } from "../../libs/stringFunctions";
import Toast from "../Toast";

export default function CallData() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [makeNoteModal, setMakeNoteModal] = useState(false);
    const [newNote, setNewNote] = useState(null);

    const calls = useSelector((state: RootState) => state.calls);
    const selectedCall = useSelector((state: RootState) => state.calls?.selectedCall);

    const fetchCallData = useCallback((id) => dispatch(Actions.Calls.GetCallData.request(id)),[dispatch]);
    const resetFetching = useCallback(() => dispatch(Actions.Calls.ResetFetching()), [dispatch]);
    const addNote = useCallback((payload) => dispatch(Actions.Calls.AddNote.request(payload)),[dispatch]);
    const archiveCall = useCallback((id) => dispatch(Actions.Calls.ArchiveCall.request(id)),[dispatch]);

    //convert call time to local time
    const callDate = selectedCall?.created_at;
    let dateInLocal = moment.utc(callDate).local().format("DD-MM-YYYY HH:mm:ss");

    //fetch calls data by id
    useEffect(() => {
    if (id) {
        fetchCallData(id);
    }
    }, [id]);

    //reset fetching status
    useEffect(() => {
        if (calls.fetchingSuccess) {
            resetFetching();
        }
    }, [calls.fetchingSuccess])

    const handleSubmitNewNote = (e) => {
        addNote({ id, content: {content: capitalizeFirstLetter(newNote)} });
        setTimeout(() => setNewNote(""), 300);
    };

    const makeNote = (
        <div className="modal-container">
            <text className="modal-title">Create new note</text>
            <textarea
            placeholder="Type your note here"
            cols={50}
            rows={5}
            className="note-input"
            onChange={(e) => setNewNote(e.target.value)}
            value={newNote}
            />
            <button className="btn" onClick={handleSubmitNewNote} disabled={!newNote}>
            Submit
            </button>
        </div>
    );

    return (
    <div className="container">
        <Toast visible={calls.fetchingError} message={calls.errorMessage} />
        <Toast visible={calls.updated} message="Data updated" type="success" />
        {calls.fetching ? (
            <LoadingSpinner />
        ) : (
        <>
            <h1>Call details</h1>
            <div className="data-container">
            <CallDataList title="Call ID" content={selectedCall?.id} />
            <CallDataList title="Date" content={dateInLocal.split(" ")[0]} />
            <CallDataList title="Time" content={dateInLocal.split(" ")[1]} />
            <CallDataList title="From" content={selectedCall?.from} />
            <CallDataList title="To" content={selectedCall?.to} />
            <CallDataList title="Via" content={selectedCall?.via} />
            <CallDataList title="Direction" content={selectedCall?.direction} />
            <CallDataList title="Call type" content={selectedCall?.call_type} />
            <CallDataList
                title="Duration"
                content={`${Math.ceil(selectedCall?.duration / 1000)}s`}
            />
            <CallDataList
                title="Notes"
                content={selectedCall?.notes}
                contentType="list"
            />
            </div>
            <div className="btn-container">
            <button className="btn" onClick={() => setMakeNoteModal(true)}>
                Add note
            </button>
            <button className="btn" onClick={() => archiveCall(id)}>
                {selectedCall?.is_archived ? "Unarchive call" : "Archive call"}
            </button>
            </div>
            <Modal
                setState={setMakeNoteModal}
                isActive={makeNoteModal}
                modalContent={makeNote}
                backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    border: "none",
                }}
                contentStyle={{ border: "none" }}
            />
        </>
        )}
    </div>
    );
}
