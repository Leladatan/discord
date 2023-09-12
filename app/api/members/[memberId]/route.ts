import {NextResponse} from "next/server";
import currentProfile from "@/utils/current-profile";
import {db} from "@/lib/db";

export const PATCH = async (req: Request, {params}: {params: {memberId: string}}) => {
    try {
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url);
        const {role} = await req.json();

        const serverId = searchParams.get("serverId")

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", {status: 400});
        }

        if (!params.memberId) {
            return new NextResponse("Member ID missing", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id
                            },
                        },
                        data: {
                            role: role
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc",
                    }
                }
            }
        });

        return NextResponse.json(server);
    }   catch (e) {
        console.log("MEMBERS_ID_PATCH", e);
        return new NextResponse("Interval Error", {status: 500});
    }
};

export const DELETE = async (req: Request, {params}: {params: {memberId: string}}) => {
    try {
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url);

        const serverId = searchParams.get("serverId")

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", {status: 400});
        }

        if (!params.memberId) {
            return new NextResponse("Member ID missing", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc",
                    }
                }
            }
        });

        return NextResponse.json(server);
    }   catch (e) {
        console.log("MEMBERS_ID_DELETE", e);
        return new NextResponse("Interval Error", {status: 500});
    }
};
