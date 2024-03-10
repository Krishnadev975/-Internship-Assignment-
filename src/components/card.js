import React from 'react'

function Cards({ id,title}) {
    const dragStart = (e) => {
        e.dataTransfer.setData('text/plain', id);
    };
return (
    <div>
        <div className='Cards' draggable="true" onDragStart={dragStart}>
            <p>{title}</p>
        </div>
    </div>
)
}

export default Cards
