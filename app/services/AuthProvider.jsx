import { SessionProvider } from 'next-auth/react';
import React, { Children } from 'react';

const AuthProvider = ({Children}) => {
    return (
        <div>
            <SessionProvider>
                {Children}
            </SessionProvider>
        </div>
    );
};

export default AuthProvider;