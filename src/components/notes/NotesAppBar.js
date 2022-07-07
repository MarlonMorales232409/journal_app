import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../redux/actions/notes";
import { PhotographIcon, PencilAltIcon } from "@heroicons/react/solid";

export const NotesAppBar = () => {
	const dispatch = useDispatch();
	const { active } = useSelector((state) => state.notes);
	const handleSave = () => {
		dispatch(startSaveNote(active));
	};

	const handleFile = (e) => {
		const file = e.target.files[0];

		if (file) {
			dispatch(startUploading(file));
		}
	};

	const activeSelectFile = () => {
		document.getElementById("selectFile").click();
	};

	return (
		<div className="notes__appbar">
			<span>28 de agosto 2020</span>

			<input
				id="selectFile"
				type="file"
				name="file"
				style={{ display: "none" }}
				onChange={handleFile}
			/>

			<div className="notes__appbar-icons">
				<button className="btn" onClick={activeSelectFile}>
					<PhotographIcon className="appbar__icon" />
				</button>

				<button className="btn" onClick={handleSave}>
					<PencilAltIcon className="appbar__icon" />
				</button>
			</div>
		</div>
	);
};
