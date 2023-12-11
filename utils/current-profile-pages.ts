import {db} from "@/lib/db";
import {getAuth} from "@clerk/nextjs/server";
import {NextApiRequest} from "next";

const currentProfilePages = async (req: NextApiRequest) => {
  const {userId} = getAuth(req);

  if (!userId) {
    return null;
  }

  return db.profile.findUnique({
    where: {
      userId: userId
    }
  });
};

export default currentProfilePages;
