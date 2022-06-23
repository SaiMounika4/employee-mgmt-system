import React, { useState, useEffect } from 'react';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import ListEmployees from './ListEmployees';
import Header from './Header';
import Swal from 'sweetalert2';

function AdminView () {
    const [employees, setEmployees] = useState([]);
    const [isAdding, setAddEmployee] = useState(false);
    const [isEditing, setEditEmployee] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(()=>{
        fetch("http://localhost:8900/employeeData")
            .then((result) => {
                result.json().then((resp) => {
                    setEmployees(resp);
                })
            })
    }, [])
    
    const handleEdit = (id) => {
        const [employee] = employees.filter(employee => employee.id === id);
        setSelectedEmployee(employee);
        setEditEmployee(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        }).then(result => {
            if (result.value) {
                fetch(`http://localhost:8900/employeeData/${id}`, {
                    method: 'DELETE'
                }).then((result) => {
                    result.json().then((resp) => {
                        console.log(resp, id);
                    })
                })
                const [employee] = employees.filter(employee => employee.id === id)

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName} ${employee.lastName} data has been deleted`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    return (
        <div className="container">
            {!isAdding && !isEditing && (
                <>
                    <Header setAddEmployee = {setAddEmployee} />
                    <ListEmployees 
                        employees = {employees}
                        handleEdit = {handleEdit}
                        handleDelete = {handleDelete}
                    />
                </>
            )}
            {isAdding && 
                <AddEmployee
                    employees = {employees}
                    setEmployees = {setEmployees}
                    setAddEmployee = {setAddEmployee}
                />
            }
            {isEditing && 
                <EditEmployee
                    employees = {employees}
                    selectedEmployee = {selectedEmployee}
                    setEmployees = {setEmployees}
                    setEditEmployee = {setEditEmployee}
                />
            }
        </div>
    )
}

export default AdminView;