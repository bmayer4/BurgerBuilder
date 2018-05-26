import React from 'react';

import classes from './Input.css';

const Input = (props) => {

    let inputElement = null;

    const inputClasses = [ classes.InputElement ];     
    let inputError = null;

    if( props.invalid && props.shouldValidate && props.touched ){
        inputClasses.push(classes.Invalid);
        inputError = (<p className={classes.error}>Field Required</p>);
    } 

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                                className={inputClasses.join('  ')}
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}
                            />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                                className={inputClasses.join('  ')}
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}
                            />;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join('  ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayName}</option> 
                    ))} 
                </select>
            );
            break;
        default:
            inputElement = <input 
                                className={inputClasses.join('  ')}
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}
                            />; 
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {inputError}
        </div> 
    );  
};

export default Input;