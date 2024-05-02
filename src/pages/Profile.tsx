import React from "react";
import { PageContainer } from "../ui/PageContainer";
import { ProfileForm } from "../features/Profile/ProfileForm";
import dummyImage from "../assets/react.svg";

export const Profile = () => {
  return (
    <PageContainer title="Profile" style="relative">
      <figure className="absolute top-0 right-0 w-24 h-24 rounded-full">
        <img src={dummyImage} alt="" className="w-full h-full object-contain" />
      </figure>
      <ProfileForm />
    </PageContainer>
  );
};
