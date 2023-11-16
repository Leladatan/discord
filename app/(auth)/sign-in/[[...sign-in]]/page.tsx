import {type FC} from 'react';
import {SignIn} from "@clerk/nextjs";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Authorized',
    description: 'Authorized',
}


const SignInPage: FC = () => {
    return (
        <SignIn />
    );
};

export default SignInPage;
