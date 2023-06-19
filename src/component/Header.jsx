import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function Header({ handleSubmit, isEdit, handleUpdate }) {
    console.log(isEdit)
    const [job, setJob] = useState("")
    useEffect(() => {
        if (isEdit) {
            setJob(isEdit.job)
        } else {
            setJob("")
        }
    },[isEdit])
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    return (
        <>
            <Form>
                <Form.Group className="mb-3 form-group" controlId="exampleForm.ControlInput1">
                    <Form.Label>Mini project</Form.Label>
                    <Form.Control value={job} onChange={(e) => setJob(e.target.value)} type="" placeholder="New task" className='input' />
                    {!isEdit ? (<button type='submit' onClick={(e) => {
                        e.preventDefault();
                        if (job !== "") {
                            handleSubmit({
                                type: "handleSubmit", newJob: {
                                    id: uuidv4(),
                                    job,
                                    complete: false
                                }
                            })
                            setJob("")
                        }else{
                            alert(" Please enter task")
                        }
                    }
                    }
                    >
                        <span className="material-symbols-outlined">
                            add_circle
                        </span>
                    </button>) : (<button onClick={() => handleUpdate({type:"handleUpdate", updateJob:{
                        id:isEdit.id,
                        job,
                        complete: isEdit.complete
                    }})}>Save</button>)}      
                </Form.Group>
            </Form>
        </>

    );
}

export default Header;