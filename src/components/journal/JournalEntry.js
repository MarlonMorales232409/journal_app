import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../redux/actions/notes";

export const JournalEntry = (props) => {
    const { id, title, body, date, url } = props;

    const noteDate = moment(date);

    const dispatch = useDispatch();

    const handleActiveNote = () => {
        dispatch(activeNote(id, { ...props }));
    };

    return (
        <div
            className="journal__entry pointer"
            onClick={() => handleActiveNote()}
        >
            {url && (
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${url})`,
                    }}
                ></div>
            )}

            <div className="journal__entry-body">
                <p className="journal__entry-title">{title}</p>
                <p className="journal__entry-content">{body}</p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format("ddd")}</span>
                <h4>{noteDate.format("Do")}</h4>
            </div>
        </div>
    );
};
