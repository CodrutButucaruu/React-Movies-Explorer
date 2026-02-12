import React from 'react';
import '../styles.css';

export default function Header() {
    return (
        <div>
            <h1 className='app-subtitle'>Movies Explorer</h1>
            <h2 className='app-subtitle'>
                Type a title, pick a genre, find your movie
            </h2>
        </div>
    );
}
