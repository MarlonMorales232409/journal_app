import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { NoteScreen } from "../notes/NoteScreen";
import { useSelector } from "react-redux";
import { NothingSelected } from "./NothingSelected";

export const JournalScreen = () => {
	const { active } = useSelector((state) => state.notes);

	const [showMenu, setShowMenu] = useState(false);

	const handleShowMenu = () => {
		const sidebar = document.querySelector(".journal__sidebar");
		if (showMenu) {
			console.log("active");
			setShowMenu(false);
			sidebar.style.transform = "translateX(100%)";
		} else {
			console.log("not active");
			setShowMenu(true);
			sidebar.style.transform = "translateX(-100%)";
		}
	};

	return (
		<>
			<div className="journal__main-content">
				<p className="hamburguer-menu" onClick={handleShowMenu}>
					Menu
				</p>
				<Sidebar />
				<main className="animate__animated animate__fadeIn animate__faster">
					{active ? <NoteScreen /> : <NothingSelected />}
				</main>
			</div>
		</>
	);
};
