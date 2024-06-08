// EmployeeList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from './EmployeeCard';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/api/users');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            {employees.map(employee => (
                <EmployeeCard key={employee.id} employee={employee} />
            ))}
        </div>
    );
}

export default EmployeeList;
