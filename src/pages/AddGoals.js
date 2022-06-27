import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Rating from '@mui/material/Rating';

export default function AddGoals ({ employees, selectedEmployee, setEmployees, setAddGoals }) {
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

    const handleAddGoals = (e) => {
        e.preventDefault();
        if (!techGoal || !processGoal) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Both goals are required!',
                showConfirmationButton: true
            })
        }

            else {
                const employee = {
                    firstName: selectedEmployee.firstName,
                    lastName: selectedEmployee.lastName,
                    email: selectedEmployee.email,
                    salary: selectedEmployee.salary,
                    dob: selectedEmployee.dob,
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
                        setAddGoals(false);
                    })
                })
    
                Swal.fire({
                    icon: 'success',
                    title: 'Updated',
                    text: `Goals are added to ${firstName} ${lastName}`,
                    showConfirmationButton: false,
                    timer: 1500
                })
            }
    }

    return (
        <div className="small-container">
            <form onSubmit={handleAddGoals}>
            <h1>Add Goals</h1>
            {/* <TextField
                id="empid"
                label="Employee ID"
                type="text"
                value={id}
                InputLabelProps={{
                    shrink: true,
                  }}
                size="small"
                readOnly
            /><br/><br/> */}
            <label><strong>Technical Goals : </strong></label>
            <TextField
                id="techgoals"
                multiline
                rows={4}
                InputLabelProps={{
                    shrink: true,
                  }}
                size="large"
                value={techGoal}
                onChange={e => setTechGoal(e.target.value)}
            /><br/><br/>
            <label><strong>Rating</strong></label>
            <Rating
                name="simple-controlled"
                value={adminTechRating}
                onChange={e => setAdminTechRating(e.target.value)}
            /><br/><br/>
            <label><strong>Process Goals : </strong></label>
            <TextField
                id="processgoals"
                multiline
                rows={4}
                InputLabelProps={{
                    shrink: true,
                  }}
                size="large"
                value={processGoal}
                onChange={e => setProcessGoal(e.target.value)}
            /><br/><br/>
            <label><strong>Rating</strong></label>
                <Rating
                    name="simple-controlled"
                    value={adminProcessRating}
                    onChange={e => setAdminProcessRating(e.target.value)}
                />
            <br/><br/>
            <Button variant="contained" type="submit">Add Goals</Button> &nbsp;&nbsp;
            <Button variant="contained" onClick={() => setAddGoals(false)}>Cancel</Button>
            </form>
        </div>
    )
}