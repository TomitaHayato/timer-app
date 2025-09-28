import { useState } from "react";
import { useAppSelector } from "../../../reduxStore/hooks";
import { selectUser } from "../../auth/slices/authSlice";
import { ProfileContent } from "./ProfileContent";
import { ProfileEditForm } from "./ProfileEditForm";

export function Profile() {
  const user = useAppSelector(selectUser);
  const [ isEdit, setIsEdit ] = useState<boolean>(false);

  if(!user) return;

  return(
    <div data-testid="profile">
      {
        isEdit
        ? <ProfileEditForm  setIsEdit={setIsEdit} />
        : <ProfileContent  setIsEdit={setIsEdit} />
      }
    </div>
  )
}