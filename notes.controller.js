const chalk = require('chalk');
const Note = require('./models/Note');

const addNote = async (title, owner) => {
	await Note.create({ title, owner });
	console.log(chalk.bgGreen('Note added'));
};

const getNotes = async () => {
	const notes = await Note.find();
	return notes;
};

const removeNote = async (id, owner) => {
	const result = await Note.deleteOne({ _id: id, owner });

	if (result.matchedCount === 0) {
		throw new Error('No notes to delete');
	}

	console.log(chalk.bgGreen('Note removed'));
};

const editNote = async (id, newTitle, owner) => {
	const result = await Note.updateOne({ _id: id, owner }, { title: newTitle });

	if (result.matchedCount === 0) {
		throw new Error('No notes to edit');
	}

	console.log(chalk.bgGreen('Note edited'));
};

module.exports = {
	addNote,
	getNotes,
	removeNote,
	editNote,
};
