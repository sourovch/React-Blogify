import { useState } from "react";
import { ProfileContext } from "../contexts";

function ProfileProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  return (
    <ProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;
