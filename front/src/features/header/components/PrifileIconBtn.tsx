import { Modal } from "../../../components/Modal";
import { openModal } from "../../../utils/modelCtl";
import { Profile } from "../../users/components/Profile";

type Props = {
  btnClass: string,
}

export function ProfileIconBtn({ btnClass }: Props) {
  return(
    <>
      <button className={btnClass} onClick={() => openModal('profile')} data-testid="profile-modal-btn">
        <span className="icon-[line-md--account] size-6"></span>
      </button>

      <Modal modalId="profile">
        <Profile />
      </Modal>
    </>
  )
}
