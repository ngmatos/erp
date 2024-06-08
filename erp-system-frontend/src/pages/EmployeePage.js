import React from 'react';
import EmployeeList from '../components/employee/EmployeeList';
import EmployeeForm from '../components/employee/EmployeeForm';
import EmployeeProfile from '../components/employee/EmployeeProfile';

function EmployeePage() {
    return (
        <div>
            <h1>Employee Management</h1>
            <EmployeeList />
            <EmployeeForm />
            <EmployeeProfile />
        </div>
    );
}

export default EmployeePage;
