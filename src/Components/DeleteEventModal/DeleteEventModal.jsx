import React from 'react';

export const DeleteEventModal = ( {onClose, onDelete, eventText} ) => {
    return (
      <>
          <div id="deleteEventModal">
              <h2>Event</h2>

              <p id="eventText">{eventText}</p>

              <button
                  onClick={onDelete}
                  id="deleteButton">Delete
              </button>
              <button
                  onClick={onClose}
                  id="closeButton">Close
              </button>
          </div>

          <div id="modalBackDrop" onClick={onClose}></div>


      </>
    )
}