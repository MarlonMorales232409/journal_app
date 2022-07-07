import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../redux/actions/auth";
import { startNewNote } from "../../redux/actions/notes";
import { JournalEntries } from "./JournalEntries";
import { LogoutIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";

export const Sidebar = () => {
	const dispatch = useDispatch();
	const name = useSelector((state) => state.auth.name);

	const handleLogout = () => {
		dispatch(startLogout());
	};

	const handleNewEntry = () => {
		dispatch(startNewNote());
	};

	return (
		<aside className="journal__sidebar">
			<div className="journal__sidebar-navbar">
				<h3 className="mt-5">
					<UserCircleIcon className="icon" />
					<span style={{ textTransform: "capitalize" }}>{name}</span>
				</h3>

				<button
					style={{ fontSize: "17px", marginTop: "13px" }}
					className="btn"
					onClick={() => handleLogout()}
				>
					<LogoutIcon className="icon" />
				</button>
			</div>

			<div
				className="journal__new-entry"
				onClick={() => handleNewEntry()}
			>
				<i className="far fa-calendar-plus fa-5x"></i>
				<p className="mt-5">New entry</p>
			</div>

			<JournalEntries />
		</aside>
	);
};
