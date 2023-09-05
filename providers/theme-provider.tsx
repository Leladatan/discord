"use client";

import {ThemeProvider} from "next-themes";
import {useEffect, useState} from "react";

const ThemesProvider = ({children}: {children: React.ReactNode}) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect((): void => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider attribute="class" storageKey="discord-theme" defaultTheme="dark" enableSystem={false}>
            {children}
        </ThemeProvider>
    );
};

export default ThemesProvider;
