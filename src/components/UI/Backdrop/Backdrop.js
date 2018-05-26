import React from 'react';

import classes from './Backdrop.css';


const BackDrop = (props) => {
    // return (
    //     <div>
    //     {props.show ? <div className={classes.Backdrop}></div> : null}
    //     </div>
    // );
    return (
        <div className={classes.Backdrop} style={{
            visibility: props.show ? 'visible' : 'hidden'
        }}
        onClick={props.backdropClicked}
        >
        </div>
    );
}

export default BackDrop;