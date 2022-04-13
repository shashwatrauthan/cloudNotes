import React, { useContext, useEffect, useState } from 'react';
import NoteItem from './NoteItem'
import noteContext from '../context/notes/NoteContext';
import { Modal, Button, Form } from 'react-bootstrap';
import alertContext from '../context/alerts/AlertContext';
import { useNavigate } from 'react-router-dom';




export default function NotesComp() {
    const navigate = useNavigate();
    const alert_context = useContext(alertContext);

    const context = useContext(noteContext);
    const { Notes, fetchAllNotes, editNote } = context;

    useEffect(() => {
        if(localStorage.getItem("authToken")!==null)
        {
            fetchAllNotes();
        }
        else
        {
            alert_context.showAlert('warning','Please login first.');
            navigate('/login');
        }
        //   eslint-disable-next-line
    }, []);

    const [show, setShow] = useState(false);
    const [note,setNote] = useState({id: "", title:"", description:""});


    const handleClose = () => setShow(false);

    const handleSave = () => {
        setShow(false);
        editNote(note.id, note.title, note.description);
        alert_context.showAlert('success','Note Edited.');
    };

    const handleShow = (currentNote) => {
        setShow(true);
        setNote({id: currentNote._id, title: currentNote.title, description: currentNote.description});
    };


    const onChange =(e)=>
    {
        setNote({...note, [e.target.name] : e.target.value});
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Form.Group className="mb-3 px-4 mt-2" controlId="updateTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={note.title} onChange={onChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3 px-4 mt-2" controlId="updateDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" rows={3} value={note.description} onChange={onChange} />
                        </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={note.title.length===0 || note.description.length===0} variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container my-3">
                <div className='container row'>
                    <hr />
                    <h2>Your Notes</h2>
                    <div className="container d-flex justify-content-center">
                        {Notes.length===0 && "No notes to display."}
                    </div>
                    {Notes.map((note) => {
                        return <NoteItem note={note} key={note._id} handleShow={handleShow} />
                    })}
                </div>
            </div>
        </>
    )
}
