import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Define the types for the modal props to ensure type safety in TypeScript
type PropTypes = {
  onClose: () => void; // Callback function to handle modal close events
  isOpen: boolean; // Boolean to determine if the modal is visible
  children: React.ReactNode; // The content to render inside the modal
  width?: number; // Optional width of the modal
  height?: number; // Optional height of the modal
};

export const Modal = ({
  isOpen = false,
  onClose,
  children,
  height,
}: PropTypes) => {

  // Local state to track whether the modal is mounted (client-side only)
  const [mounted, setMounted] = useState(false);

  // Effect hook to ensure the modal logic runs only on the client side
  useEffect(() => {
    setMounted(true); // Set the mounted state to true when the component is rendered on the client
    return () => setMounted(false); // Cleanup to set the mounted state to false when the component unmounts
  }, []);

  // If the modal is not open or the component is not yet mounted on the client, render nothing
  if (!isOpen || !mounted) return null;

  // Use React Portals to render the modal content outside of the main DOM hierarchy
  return createPortal(
    <div
      onClick={onClose} // Clicking outside the modal content triggers the `onClose` function
      className="z-50 bg-black bg-opacity-15 w-screen h-screen absolute flex items-center justify-center text-text bg-background"
    >
      {/* Use Framer Motion for animation when the modal appears */}
      <motion.div
        initial={{ y: -10, opacity: 0 }} // Initial animation state
        animate={{ y: 0, opacity: 1 }} // Target animation state
        onClick={(e) => e.stopPropagation()} // Prevent the click event from propagating to the overlay
        className={`min-w-[30rem] max-w-[35rem] max-sm:w-[90%] max-sm:min-w-[auto] h-[${
          height || "auto"
        }rem] rounded-lg p-4 shadow-xl bg-black`}
      >
        {children} {/* Render the content passed as children */}
      </motion.div>
    </div>,
    document.getElementById("modal-root") as HTMLElement // Render the modal into the modal root (defined in `layout.ts`)
  );
};