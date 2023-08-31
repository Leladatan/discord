import {type FC} from 'react';
import {Metadata} from "next";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Discord Auth',
    description: 'Discord app auth description',
};

const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
    return (
        <div className="flex justify-center items-center bg-neutral-800 h-full">
            {children}
        </div>
    );
};

export default AuthLayout;
