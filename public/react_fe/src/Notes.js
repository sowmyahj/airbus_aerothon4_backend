import "./App.css";
import { useEffect, useState } from "react";

function Notes(props) {
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await fetch("/api/notes/");
      let results = await res.json();
      setNotesList(results.notes);
    })();
  }, []);

  if (!props.loginState) {
    return null;
  }

  function addNoteToList(note) {
    let tmp = notesList.slice();
    tmp.push(note);
    setNotesList(tmp);
  }

  function deleteNoteFromList(idx) {
    let tmp = notesList.slice();
    tmp.splice(idx, 1);
    setNotesList(tmp);
  }

  const notes = notesList.map((note, idx) => {
    return (
      <li key={idx}>
        <Note note={note} deleteNote={() => deleteNoteFromList(idx)} />
        <br />
      </li>
    );
  });

  return (
    <div>
      <button
        className="btn btn-primary logout"
        onClick={() => props.setLoginState(false)}
      >
        Logout
      </button>
      <div className="App-form">
        <NoteInputForm addNoteToList={(note) => addNoteToList(note)} />
        <ul>{notes}</ul>
      </div>
    </div>
  );
}

function NoteInputForm(props) {
  const [note, setNote] = useState("");

  async function addNote(e) {
    e.preventDefault();

    if (note.trim() === "") {
      alert("Note cannot be empty. Please enter a value");
      return;
    }

    let res = await fetch("/api/notes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ note: note }),
    });

    let result = await res.json();
    if (result.done) {
      props.addNoteToList(result.note);
    } else if (result.note === "NOT SUPPORTED") {
      alert(
        "Backend does not support Notes app. Try with a different backend."
      );
    } else {
      alert("Unable to add note.");
    }
    setNote("");
  }

  return (
    <div>
      <form className="row g-3" onSubmit={(e) => addNote(e)}>
        <div className="col-auto">
          <input
            className="form-control"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary mb-3" type="submit">
            Add Notes
          </button>
        </div>
      </form>
    </div>
  );
}

function Note(props) {
  const [editing, setIsEditing] = useState(false);

  async function deleteNote() {
    let res = await fetch("/api/notes/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: props.note.id }),
    });

    let result = await res.json();
    if (result.done) {
      props.deleteNote();
    } else {
      alert("Unable to delete note.");
    }
  }

  if (!editing) {
    return (
      <div className="row g-3">
        <label className="fw-bold">{props.note.value}</label>
        <div className="col-auto">
          <button
            className="btn btn-secondary btn-sm"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
        <div className="col-auto">
          <button
            className="btn btn-secondary btn-sm"
            type="delete"
            onClick={() => deleteNote()}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <label className="fw-bold">{props.note.value}</label>
      <NoteEditForm
        setEditState={(state) => setIsEditing(state)}
        note={props.note}
      />
    </div>
  );
}

function NoteEditForm(props) {
  const [newName, setNewName] = useState("");

  async function updateNote(e) {
    e.preventDefault();

    if (newName.trim() === "") {
      alert("Note cannot be empty. Please enter a value");
      return;
    }

    let res = await fetch("/api/notes/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: props.note.id, value: newName }),
    });

    let result = await res.json();
    if (result.done) {
      props.note.value = result.note.value;
    } else {
      alert("Unable to update note.");
    }
    props.setEditState(false);
  }

  return (
    <form className="row g-3" onSubmit={(e) => updateNote(e)}>
      <label>Enter new name: </label>
      <div className="col-auto">
        <input
          className="form-control"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="col-auto">
        <button className="btn btn-light btn-sm" type="submit">
          update
        </button>
      </div>
      <div className="col-auto">
        <button
          className="btn btn-light btn-sm"
          type="button"
          onClick={() => props.setEditState(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Notes;
