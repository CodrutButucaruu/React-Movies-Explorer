import React from 'react';
import '../styles.css';

export default function Modal({open, onClose, children}) {
    if (!open) return null;

    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
