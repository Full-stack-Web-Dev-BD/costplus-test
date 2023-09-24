import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PaypalIntegration from "./PaypalIntegration";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function PaypalModalIntegration({ title, plan }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        //    onClick={(e) => upgradePlan("basic")}
        className="btn theme-btn"
      >
        {title}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <PaypalIntegration plan={plan}   /> 
          </div>
          <div>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
