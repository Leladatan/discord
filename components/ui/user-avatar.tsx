import {type FC} from 'react';
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Profile} from "@prisma/client";
import {cn} from "@/lib/utils";

interface UserAvatarProps {
    profile: Profile;
    className?: string
}

const UserAvatar: FC<UserAvatarProps> = ({profile, className}) => {
    return (
        <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
            <AvatarImage src={profile.imageUrl} alt={profile.name} />
        </Avatar>
    );
};

export default UserAvatar;
