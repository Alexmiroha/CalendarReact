import React from 'react';

export const Day = (props) => {
    console.log(props)
    return (
      <div>
          <br/>{props.day.date}<br/>
      </div>
    )
}