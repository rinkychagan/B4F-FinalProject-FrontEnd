import Profile from "../../components/profile/profile_picture";
import { getLoginUserDetails } from "@/actions/authAction/authActions";

export default async function profile() {
  const user = await getLoginUserDetails().then((data) => {
    return data.data?.data;
  });
  console.log("data::: profile ", user);

  return (
    <div>
          <Profile user={user} key={user._id} />
    </div>
  );
}
