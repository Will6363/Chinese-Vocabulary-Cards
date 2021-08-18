import React from 'react';

function Radio(props) {
    const options = props.values.map((value) => 
        <div className="radio-button" key={value.value}>
            <input type="radio" name={props.name} value={value.value} id={props.id + "-" + value.value} />
            <label htmlFor={props.id + value.value}>{value.text}</label>
        </div>
    )

    return (
        <form onChange={props.handleChange}>
            {options}
        </form>
    )
}

export default Radio