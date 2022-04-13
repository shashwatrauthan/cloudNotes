import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import noteContext from '../context/notes/NoteContext';


export default function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <>
            <div className="col-md-3 my-2">
                <Card style={{ height: '16rem'}}>
                    <Card.Body>
                        <Card.Title>{props.note.title}</Card.Title>
                        <Card.Text>
                            {props.note.description}
                        </Card.Text>
                        <i className="fa-solid fa-lg fa-pen-to-square" style={{ position: 'absolute' , bottom: '1.5rem', right: '2.8rem', fontWeight: '600'}} onClick={()=> props.handleShow(props.note)}></i>
                        <i className="fa-solid fa-lg fa-trash-can" onClick={()=> deleteNote(props.note._id)} style={{ position: 'absolute' , bottom: '1.5rem', right: '1rem'}}></i>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
