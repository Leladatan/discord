import {type FC} from 'react';
import {HashLoader} from "react-spinners";

interface HashLoaderProps {
    size: number;
    color: string;
    loading?: boolean;
}

const Loader: FC<HashLoaderProps> = ({size, color, loading = true}) => {
    return (
        <HashLoader color={color} size={size} loading={loading} />
    );
};

export default Loader;
