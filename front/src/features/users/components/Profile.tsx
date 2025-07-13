import { useState } from "react";
import { useAppSelector } from "../../../reduxStore/hooks";
import { selectUser } from "../../session/slices/sessionSlice";
import { ProfileContent } from "./ProfileContent";
import { ProfileEditForm } from "./ProfileEditForm";

export function Profile() {
  const user = useAppSelector(selectUser);
  const [ isEdit, setIsEdit ] = useState<boolean>(false);

  if(!user) return;

  return(
    <>
      {
        isEdit
        ? <ProfileEditForm  setIsEdit={setIsEdit} />
        : <ProfileContent  setIsEdit={setIsEdit} />
      }
    </>
  )
}