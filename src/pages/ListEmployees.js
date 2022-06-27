import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

export default function ListEmployees ({ employees, handleEdit, handleAddGoals, handleDelete }) {

    return (
        <div>
            { employees && (
            <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="right" style={{ fontWeight: 600 }}>ID #</TableCell>
                    <TableCell align="right" style={{ fontWeight: 600 }}>First Name</TableCell>
                    <TableCell align="right" style={{ fontWeight: 600 }}>Last Name</TableCell>
                    <TableCell align="right" style={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell align="right" style={{ fontWeight: 600 }}>Salary</TableCell>
                    <TableCell align="right" style={{ fontWeight: 600 }}>DOB</TableCell>
                    <TableCell align="right" style={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {employees.map((row) => (
                    <TableRow>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.salary}</TableCell>
                    <TableCell align="right">{row.dob}</TableCell>
                    <TableCell align="right">
                        <Button variant="outlined" size="small" onClick={()=>handleEdit(row.id)}>Edit</Button> &nbsp;&nbsp;
                        <Button variant="outlined" size="small" onClick={()=>handleAddGoals(row.id)}>Add Goals</Button> &nbsp;&nbsp;
                        <Button variant="outlined" size="small" onClick={()=>handleDelete(row.id)}>Delete</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        )}
        </div>
    )
}