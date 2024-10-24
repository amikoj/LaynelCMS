import React from 'react';

const AdminLayout = ({ children, login }: { children: React.ReactNode, login: React.ReactNode }) => {

    return (
        <div>
            {/* {isAuthenticated() ? children : login} */}
            {children}
        </div>
    )
}

export default AdminLayout;