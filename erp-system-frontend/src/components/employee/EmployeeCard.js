// EmployeeCard.js

import React from 'react';

function EmployeeCard({ employee }) {
    return (
        <div>
            <h3>{employee.name}</h3>
            <p>Email: {employee.email}</p>
            {/* Additional employee details */}
        </div>
    );
}

export default EmployeeCard;
