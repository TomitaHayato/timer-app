import { Modal } from "../../../components/Modal";
import { openModal } from "../../../utils/modelCtl";
import { Profile } from "../../users/components/Profile";

export function ProfileIconBtn() {
  return(
    <>
      <button className="btn btn-sm btn-outline" onClick={() => openModal('profile')}>
        <span className="icon-[line-md--account] size-6"></span>
      </button>

      <Modal modalId="profile">
        <Profile />
      </Modal>
    </>
  )
}
