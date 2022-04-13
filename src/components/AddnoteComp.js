import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import noteContext from '../context/notes/NoteContext';


export default function AddnoteComp() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note,setNote] = useState({title:"", description:""});

    const onAdd = ()=>
    {
        addNote(note);
        setNote({title:"", description:""});
    }

    const onChange =(e)=>
    {
        setNote({...note, [e.target.name] : e.target.value});
    }

    return (
        <>
            <div className='container'>
                <div className='container my-2'>
                    <h2>Add a Note</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={note.title} placeholder="Title..." onChange={onChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={note.description} rows={3} placeholder="Description..." onChange={onChange} />
                        </Form.Group>
                        <Button disabled={note.title.length===0 || note.description.length===0} variant="primary" type="button" onClick={onAdd}>
                            Add Note
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}
