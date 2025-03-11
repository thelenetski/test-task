import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modal/slice";
import { selectIsOpenModal } from "../../redux/modal/selectors";
import { createPortal } from "react-dom";
import { ReactNode, useEffect } from "react";

interface ModalWindowProps {
  children: ReactNode;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    isOpen
      ? document.body.classList.add("no-scroll")
      : document.body.classList.remove("no-scroll");
  }, [isOpen]);

  const modalRoot = document.getElementById("modal-root") as HTMLElement | null;

  return modalRoot
    ? createPortal(
        <>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModalHandler}
            className="relative p-[48px_16px] rounded-[15px] min-w-32 h-auto mx-[16px] bg-[#ffffff]"
            ariaHideApp={false}
            overlayClassName="fixed top-0 left-0 w-full h-full bg-[rgba(47,47,47,0.6)] flex justify-center items-center z-[1000]"
          >
            <button
              className="absolute top-4 right-4 bg-transparent border-0 cursor-pointer p-0 transition-all duration-300"
              onClick={closeModalHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-wrap justify-center relative rounded-[15px] w-full mx-auto">
              {children}
            </div>
          </Modal>
        </>,
        modalRoot
      )
    : null;
};

export default ModalWindow;
