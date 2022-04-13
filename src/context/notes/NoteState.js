import { useState, useContext } from "react";
import noteContext from "./NoteContext";
import alertContext from '../alerts/AlertContext';


const NoteState = (props) => {
    const context = useContext(alertContext);

    const host = "https://cloud-notes-backend1.vercel.app";
    const auth_token = localStorage.getItem('authToken');

    const [Notes, setNotes] = useState([]);

    // Fetch All Notes
    const fetchAllNotes = async () => {
        let url = `${host}/api/notes/fetchallnotes`;
        let params = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'auth-token': auth_token
            }
        }
        const response = await fetch(url, params);
        const json = await response.json();
        setNotes(json);
    }


    // Add Note
    const addNote = async (note) => {
        let url = `${host}/api/notes/addnote`;
        let params = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'auth-token': auth_token
            },
            body: JSON.stringify(note)
        }
        const response = await fetch(url, params);
        //   eslint-disable-next-line
        const json = await response.json();
        fetchAllNotes();
        context.showAlert('success','Note Added.');


        // setNotes(Notes.concat(json));

        // fetch(url,params).then(fetchAllNotes());

    }

    // Delete Note
    const deleteNote = async (id) => {
        let url = `${host}/api/notes/deletenote/${id}`;
        let params = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'auth-token': auth_token
            },
        }
        const response = await fetch(url, params);
        //   eslint-disable-next-line
        const json = await response.json();
        fetchAllNotes();
        context.showAlert('success','Note Deleted.');


        // let newNote = Notes.filter((note) => { return note._id !== id });
        // setNotes(newNote);
    }

    // Edit Note
    const editNote = async (id, title, description) => {
        let url = `${host}/api/notes/updatenote/${id}`;
        let params = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'auth-token': auth_token
            },
            body: JSON.stringify({title, description})
        }
        const response = await fetch(url, params);
        //   eslint-disable-next-line
        const json = await response.json();
        fetchAllNotes();

        // fetch(url,params).then(fetchAllNotes());
    }



    return (
        <noteContext.Provider value={{ Notes, addNote, deleteNote, fetchAllNotes, editNote }}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;