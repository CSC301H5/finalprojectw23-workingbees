import React from 'react';

/* The description should be "Phase N" if the user is the host,
and "Team of N" if the user is an attendee
*/
export default function BigEntry({ name, description }) {
    return (
        <>
            <h1>{name}</h1>
            <h3>{description}</h3>
        </>
    )
}