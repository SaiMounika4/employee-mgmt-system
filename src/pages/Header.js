import React from 'react';
import Button from '@mui/material/Button';

export default function Header ({ setAddEmployee }) {
    return (
        <header>
            <h1>Employee Management System</h1>
            <div>
                <Button variant="contained" onClick={() => setAddEmployee(true)}>Add Employee</Button>
            </div>
        </header>
    )
}