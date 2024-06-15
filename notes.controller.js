const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

const addNote = async (title) => {
	const notes = await getNotes();
	const note = {
		title,
		id: Date.now().toString(),
	};
	notes.push(note);
	await fs.writeFile(notesPath, JSON.stringify(notes));
	console.log(chalk.bgGreen('Note added'));
};

const getNotes = async () => {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
};

const printNotes = async () => {
	const notes = await getNotes();
	console.log(chalk.bgBlue('List of notes:'));
	notes.forEach(({ title, id }) => console.log(chalk.blue(id, title)));
};

const removeNote = async (id) => {
	const notes = await getNotes();
	const noteIndexToRemove = notes.findIndex((note) => Number(note.id) === Number(id));

	if (noteIndexToRemove !== -1) {
		notes.splice(noteIndexToRemove, 1);
	}

	await fs.writeFile(notesPath, JSON.stringify(notes));

	console.log(chalk.bgGreen('Note removed'));
};

const editNote = async (id, newTitle) => {
	const notes = await getNotes();
	notes.find((note) => {
		if (note.id === id) {
			note.title = newTitle;
			return true;
		}
	});

	await fs.writeFile(notesPath, JSON.stringify(notes));

	console.log(chalk.bgGreen('Note edited'));
};

module.exports = {
	addNote,
	getNotes,
	removeNote,
	editNote,
};
