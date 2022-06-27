import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Rating from '@mui/material/Rating';

export default function EditEmployee ({ employees, selectedEmployee, setEmployees, setEditEmployee}) {
    const id = selectedEmployee.id;
    const [firstName, setFirstName] = useState(selectedEmployee.firstName);
    const [lastName, setLastName] = useState(selectedEmployee.lastName);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [salary, setSalary] = useState(selectedEmployee.salary);
    const [dob, setDob] = useState(selectedEmployee.dob);
    const [techGoal, setTechGoal] = useState(selectedEmployee.goal_1);
    const [processGoal, setProcessGoal] = useState(selectedEmployee.goal_2);
    const [adminTechRating, setAdminTechRating] = React.useState(selectedEmployee.goal1Rating);
    const [adminProcessRating, setAdminProcessRating] = React.useState(selectedEmployee.goal2Rating);

    const handleUpdate = (e) => {
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
            const employee = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                salary: salary,
                dob: dob,
                goal_1: techGoal,
                goal_2: processGoal,
                goal1Rating: adminTechRating,
                goal2Rating: adminProcessRating
            }

            for (let i=0; i<employees.length; i++) {
                if (employees[i].id === id) {
                    employees.splice(i, 1, employee);
                    break;
                }
            }

            fetch(`http://localhost:8900/employeeData/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(employee)
            }).then((result)=>{
                    result.json().then((resp)=>{
                    console.log(resp);
                    console.log(employees);
                    console.log(employee);
                    setEditEmployee(false);
                })
            })

            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: `${firstName} ${lastName} data has been updated`,
                showConfirmationButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div className="small-container">
            <form style={{ margin: "auto" }} onSubmit={handleUpdate}>
            <h1>Edit Employee</h1>
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
            <Button variant="contained" type="submit">Update</Button> &nbsp;&nbsp;
            <Button variant="contained" onClick={() => setEditEmployee(false)}>Cancel</Button>
            </form>
            </div>
    )
}