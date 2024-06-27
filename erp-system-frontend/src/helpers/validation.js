import { isEmail } from "validator";

// Funções de validação
export const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Invalid email format.
            </div>
        );
    }
};

export const vname = value => {
    if (value.length < 3 || value.length > 100) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 100 characters.
            </div>
        );
    }
};

export const vpassword = value => {
    if (value.length < 8 || value.length > 100) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 8 and 100 characters.
            </div>
        );
    }
};

// Endereço pode ser nulo ou vazio, mas se não for, deve ter entre 5 e 100 caracteres
export const vaddress = value => {
    if (value && (value.length < 5 || value.length > 100)) {
        return (
            <div className="alert alert-danger" role="alert">
                The address must be between 5 and 100 characters.
            </div>
        );
    }
};

export const vcategory = value => {
    if (value && (value.length < 5 || value.length > 100)) {
        return (
            <div className="alert alert-danger" role="alert">
                The address must be between 5 and 100 characters.
            </div>
        );
    }
};

export const vstockQuantity = value => {
    if (value && (value < 0 || value > 1000)) {
        return (
            <div className="alert alert-danger" role="alert">
                The stock quantity must be between 0 and 1000.
            </div>
        );
    }
};