let loginRender = true;
const form = document.querySelector('form');
const notesPage = document.querySelector(".container");
const noteInput = document.querySelector("#note");
const addButton = document.querySelector("#add_button");
const notesContainer = document.querySelector(".note_container");
const addNote = async() => {
    if (noteInput.value.length > 0) {
        const res = await fetch('http://localhost:3002/api/notes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                note: noteInput.value
            })
        });
        const data = await res.json();
        if (data.done) {
            notes.push({
                id: data.note.id,
                msg: noteInput.value,
                updating: false
            });
            notesContainer.innerHTML += createNoteElement(notes[notes.length - 1]);
            noteInput.value = "";
        }
    }
}
addButton.addEventListener("click", addNote);
noteInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        addNote();
    }
});

const notes = []
const renderLogin = () => {
    if (loginRender) {
        form.style.display = "block";
        notesPage.style.display = "none";
    } else {
        form.style.display = "none";
        notesPage.style.display = "block";
        if (notes.length == 0) {
            getNotes();
        }
    }
}

const getNotes = async() => {
    const res = await fetch('http://localhost:3002/api/notes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    console.log(data.notes)
    data.notes.forEach(note => {
        notes.push({
            id: note.id,
            msg: note.value,
            updating: false
        });
    });
    renderNotes();
}

async function deleteClick(w) {
    const res = await fetch('http://localhost:3002/api/notes/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: w
        })
    });
    const data = await res.json();
    if (data.done) {
        const ind = notes.findIndex(note => note.id == w);
        notes.splice(ind, 1);
        const noteElemet = notesContainer.childNodes[ind];
        notesContainer.removeChild(noteElemet);
    }
}

function updateClick(id) {
    const ind = notes.findIndex(note => note.id == id);
    notes[ind].updating = true;
    renderNotes();
}

function createNoteElement(note) {
    return `<div class="note" id="${note.id}">
                <span>${note.msg}</span>
                <div class="buttons">
                    <button class="edit_button" onclick="updateClick('${note.id}')">Update</button>
                    <button class="delete_button" onclick="deleteClick('${note.id}')">Delete</button>
                </div>
            </div>`
}

async function onChangeText(id) {
    const ntele = document.querySelector("#changing");
    const res = await fetch('http://localhost:3002/api/notes/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            value: ntele.value
        })
    });
    const data = await res.json();
    // console.log(data);
    if (data.done) {
        const ind = notes.findIndex(note => note.id == id);
        notes[ind].msg = ntele.value;
        notes[ind].updating = false;
        renderNotes();
    }
}

function createNoteElementUpdating(note) {
    return `
    <div class="note updating"  id="_${note.id}">
        <input type="text" value="${note.msg}" id="changing"/>
        <div class="buttons">
        <button class="edit_button" onclick="onChangeText('${note.id}')">Update</button>
    </div>
        </div>`;
}

function renderNotes() {
    notesContainer.innerHTML = "";
    for (let note of notes) {
        if (note.updating) {
            notesContainer.innerHTML += createNoteElementUpdating(note);
        } else {
            notesContainer.innerHTML += createNoteElement(note);
        }

    }
}
async function onSubmit(e) {
    e.preventDefault();
    const username = e.srcElement[0].value;
    const password = e.srcElement[1].value;
    const res = await fetch('http://localhost:3002/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    const data = await res.json();
    if (data.response == "success") {
        loginRender = false;
        renderLogin();
    }
}
form.addEventListener("submit", onSubmit);
renderLogin();