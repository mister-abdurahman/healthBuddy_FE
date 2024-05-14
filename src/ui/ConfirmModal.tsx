import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "./Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #6a78e4",
  borderRadius: ".5rem",
  boxShadow: 24,
  padding: "1.2rem 1.4rem",
};

interface Iprops {
  open: boolean;
  handleClose: () => void;
  title: string;
  body: string;
  action: () => void;
}

export default function ConfirmModal({
  open,
  handleClose,
  title,
  body,
  action,
}: Iprops) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {body}
          </Typography>
          <div className="flex gap-4 mt-6 text-xs">
            <Button style=" text-white" onClick={handleClose}>
              No
            </Button>
            <Button style=" bg-red-600 text-white" onClick={action}>
              I'm sure
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
