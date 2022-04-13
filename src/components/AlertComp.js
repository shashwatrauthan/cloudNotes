import React from 'react'
import { Alert } from 'react-bootstrap';


export default function AlertComp(props) {
    return (
        <div style={{height : "3.4rem"}}>
            {props.alert && <Alert variant={props.alert.variant}>
                {props.alert.msg}
            </Alert>}
        </div>
    )
}