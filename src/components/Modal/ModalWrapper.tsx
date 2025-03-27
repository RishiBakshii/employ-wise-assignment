import { selectIsDeleteFormOpen, selectIsEditFormOpen, setIsDeleteFormOpen, setIsEditFormOpen } from "../../lib/redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "../../lib/redux/store/hooks";
import { DeleteUserDialog } from "../dialogs/deleteUserDialog";
import { EditUserForm } from "../forms/editUserForm";
import { Modal } from "./Modal";

export const ModalWrapper = () => {

  const editFormOpen =  useAppSelector(selectIsEditFormOpen);
  const deleteFormOpen =  useAppSelector(selectIsDeleteFormOpen);

  const dispatch = useAppDispatch();

  return (
    <>
      <Modal
        isOpen={editFormOpen}
        onClose={() => dispatch(setIsEditFormOpen(false))}
      >
        <EditUserForm/>
      </Modal>
      <Modal
        isOpen={deleteFormOpen}
        onClose={() => dispatch(setIsDeleteFormOpen(false))}
      >
        <DeleteUserDialog/>
      </Modal>


    </>
  );
};