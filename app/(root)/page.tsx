import {NextPage} from "next";
import {UserButton} from "@clerk/nextjs";
import ThemeSwitcher from "@/components/theme-switcher";

const HomePage: NextPage = () => {
    return (
        <div className="flex gap-x-4">
            <h1>Discord</h1>
            <UserButton afterSignOutUrl="/"/>
            <ThemeSwitcher/>
        </div>
    );
};

export default HomePage;
