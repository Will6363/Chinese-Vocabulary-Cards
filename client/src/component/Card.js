import React, { useEffect, useState } from 'react';
import './Card.css';

function Card(props) {

    const [values, setValues] = useState(props);
    const [controls, setControls] = useState({hintCheckbox: false})

    useEffect(() => {
        if (values.input === values.target) {
            console.log("equals"); //replace with some event for correct answer
        }
        values.inputCallback(values.input)
        
    }, [values.input, values.target]);

    const handleValueChange = (event) => {
        setValues( prevValues => { return {...prevValues, [event.target.name]: event.target.value}});
    };

    const handleCheckboxChange = (event) => {
        const target = event.target;
        setControls({[target.name]: target.checked})
    }

    return (
        <div className='card-container'>
            <div className='card-content'>
                {values.image !== undefined ? <div className='card-image'>{values.image}</div> : null}
                <div className='card-title'>
                    <p>{values.title}</p>
                </div>
                <div className='card-body'>
                    <p>{values.body}</p>
                </div>
                <div className='card-input'>
                    <label>Pinyin:</label>
                    <input type="text" name="input" value={values.input} onChange={handleValueChange} />
                </div>
                <div className='card-extra'>
                    <label htmlFor="hintCheckbox">Hint!</label>
                    <input type="checkbox" name="hintCheckbox" checked={controls.showHint} onChange={handleCheckboxChange}/>
                    {controls.hintCheckbox ? <p className="hint">{values.target}</p> : null}
                </div>
            </div>
        </div>
    );
}

export default Card;