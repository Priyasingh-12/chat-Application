import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
    const {authUser} = useAuthStore() ;

    return ( 
        <>
        <h1>my profile</h1>
        </>
     );
}
 
export default ProfilePage;