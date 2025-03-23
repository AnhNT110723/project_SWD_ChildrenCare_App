import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import UserList from "./UserList";
import UserForm from "./UserForm";

const AdminPage = () => {
    return (
        <>
            <AdminNavbar />
            <Routes>
                <Route path="/users" element={<UserList />} />
                <Route path="/user/add" element={<UserForm />} />
                <Route path="/user/:id" element={<UserForm />} />
            </Routes>
        </>
    );
};

export default AdminPage;
