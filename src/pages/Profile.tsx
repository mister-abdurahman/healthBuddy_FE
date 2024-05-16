import { PageContainer } from "../ui/PageContainer";
import { ProfileForm } from "../features/Profile/ProfileForm";
import dummyImage from "../assets/avatar2.png";
import { RootState } from "../Data/State/store";
import { useSelector } from "react-redux";

export const Profile = () => {
  const profilePicture = useSelector(
    (state: RootState) => state.user.userDetails.profilePicture
  );

  return (
    <PageContainer title="Profile" style="relative">
      <figure className="absolute top-0 right-0 w-24 h-24 rounded-full overflow-clip">
        <img
          src={profilePicture || dummyImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </figure>
      <ProfileForm />
    </PageContainer>
  );
};
