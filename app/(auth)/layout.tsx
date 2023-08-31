import {type FC} from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
    return (
        <div className="flex justify-center items-center bg-neutral-800 h-full">
            {children}
        </div>
    );
};

export default AuthLayout;
