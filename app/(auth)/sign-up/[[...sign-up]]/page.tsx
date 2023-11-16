import {type FC} from 'react';
import {SignUp} from "@clerk/nextjs";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Registration',
    description: 'Registration',
}

const SignUpPage: FC = () => {
    return (
        <SignUp />
    );
};

export default SignUpPage;
