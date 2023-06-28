import React from "react";
import SignUp from "../../components/sign-up/SignUp";

const AdminCreateUser = () => {
    return (
        <>
        <SignUp isAdminCreating={true}/>
        </>
    );
}

export default AdminCreateUser;