import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function AddEmployee ({ employees, setEmployees, setAddEmployee}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState(0);
    const [dob,setDob] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !salary ||!dob) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'All fields are required!',
                showConfirmationButton: true
            })
        }
        else {
            const newEmployee = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                salary: salary,
                dob: dob
            }

            fetch("http://localhost:8900/employeeData", {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newEmployee)
            }).then((result)=>{
                console.log(result);
                result.json().then((resp)=>{
                    console.log(resp);
                    employees.push(resp);
                    setEmployees(employees);
                    setAddEmployee(false);
                })
            })

            Swal.fire({
                icon: 'success',
                title: 'Added',
                text: `${firstName} ${lastName} data has been added`,
                showConfirmationButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
            <h1>Add Employee</h1>
            <TextField
                id="fname"
                label="First Name"
                type="text"
                value={firstName}
                InputLabelProps={{
                    shrink: true,
                  }}
                size="small"
                onChange={e => setFirstName(e.target.value)}
            /><br/><br/>
            <TextField
                id="lname"
                label="Last Name"
                type="text"
                value={lastName}
                InputLabelProps={{
                    shrink: true,
                  }}
                size="small"
                onChange={e => setLastName(e.target.value)}
            /><br/><br/>
            <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                InputLabelProps={{
                    shrink: true,
                  }}
                size="small"
                onChange={e => setEmail(e.target.value)}
            /><br/><br/>
            <TextField
                id="salary"
                label="Salary"
                type="number"
                value={salary}
                InputLabelProps={{
                    shrink: true,
                  }}
                size="small"
                onChange={e => setSalary(e.target.value)}
            /><br/><br/>
            <TextField
                id="dob"
                label="Date Of Birth"
                type="date"
                value={dob}
                InputLabelProps={{
                    shrink: true,
                  }}
                size="large"
                onChange={e => setDob(e.target.value)}
            /><br/><br/>
            <Button variant="contained" type="submit">Add</Button> &nbsp;&nbsp;
            <Button variant="contained" onClick={() => setAddEmployee(false)}>Cancel</Button>
            </form>
        </div>
    )
}