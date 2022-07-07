import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeleteNote } from "../../redux/actions/notes";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { active: note } = useSelector((state) => state.notes);
    const [values, handleInputChange, reset] = useForm(note);

    const { title, body, id } = values;

    const activeId = useRef(note.id);

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        if (note.url) {
            values.url = note.url;
        }
        dispatch(activeNote(id, { ...values }));
    }, [dispatch, id, values]);

    const handleDelete = (id) => {
        dispatch(startDeleteNote(note.id));
    };

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    name="body"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {note.url && (
                    <div className="notes__image animate__animated animate__bounceIn animate__faster">
                        <img src={note.url} alt="imagen" />
                    </div>
                )}
            </div>
            <button className="btn btn-danger" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};
