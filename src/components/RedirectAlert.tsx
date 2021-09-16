import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
type Props = {
  sourceUrl: string;
  open: boolean;
  toggle: () => void;
};
const RedirectAlert: React.FC<Props> = ({ open, sourceUrl, toggle }) => {
  const [isOpen, setIsOpen] = useState(open);
  const onClose = () => {
    setIsOpen(false);
    toggle();
    window.location.href = sourceUrl;
  };
  const onCancel = () => {
    setIsOpen(false);
    toggle();
  };
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCancel}
      size="sm"
      isCentered={true}
      motionPreset="scale"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            This will redirect you to the recipe source website.
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to redirect to the recipe source?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default RedirectAlert;
