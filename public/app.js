document.addEventListener('click', (event) => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id;
		remove(id).then(() => {
			event.target.closest('div').remove();
		});
	}

	if (event.target.dataset.type === 'edit') {
		event.target.closest('div').classList.add('editing');
	}

	if (event.target.dataset.type === 'save') {
		const id = event.target.dataset.id;
		const newTitle = event.target.closest('div').children[1].value;
		edit(id, newTitle).then(() => {
			if (newTitle) {
				event.target.closest('div').children[0].innerHTML = newTitle;
				event.target.closest('div').classList.remove('editing');
			}
		});
	}

	if (event.target.dataset.type === 'cancel') {
		event.target.closest('div').classList.remove('editing');
		event.target.closest('div').children[1].value =
			event.target.closest('div').children[0].innerHTML;
	}
});

async function remove(id) {
	await fetch(`/${id}`, {
		method: 'DELETE',
	});
}

async function edit(id, newTitle) {
	if (newTitle) {
		await fetch(`/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				title: newTitle,
				id,
			}),
		});
	}
}
