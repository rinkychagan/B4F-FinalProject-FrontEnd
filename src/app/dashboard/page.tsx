import { getLoginUserDetails } from "@/actions/authAction/authActions";
import UserUpdateForm from "@/components/usersettings/UpdateUserForm"







async function page() {
  async function getUsers() {
    try {
      const response = await getLoginUserDetails();
      const users = response.data?.data; // Use optional chaining to handle potential missing properties
      return users;
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
  const user = await getUsers();
  return (
    <div className="flex flex-col h-screen items-center justify-center text-white">
      <UserUpdateForm  user= {user} />
    </div>
  )
}

export default page