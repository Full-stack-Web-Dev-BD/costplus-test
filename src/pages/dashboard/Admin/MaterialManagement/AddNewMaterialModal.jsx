import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL, authTokenInHeader } from "../../../../utils/constant";
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

export default function AddNewMaterialModal({ title, reFetchMaterials  }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isCreating, setisCreating] = useState(false);
  const [name, setname] = useState();
  const [pricePerUnit, setpricePerUnit] = useState();
  const [defaultUnitAmount, setdefaultUnitAmount] = useState();

  const addMaterial = async (e) => {
    e.preventDefault();
    if (isCreating) return;
    if (!name || !pricePerUnit || !defaultUnitAmount) {
      toast.error("Please fill the form correctly and try again !!!");
    } else {
      setisCreating(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/admin/material`,
          {
            name: name,
            pricePerUnit: pricePerUnit,
            defaultUnitAmount: defaultUnitAmount,
          },
          {
            headers: authTokenInHeader(),
          }
        );
        toast.success("Material added successfully !!!");
        handleClose()
        setname('')
        setpricePerUnit('')
        setdefaultUnitAmount('')
        reFetchMaterials();
      } catch (error) {
        console.log(error);
      }
      setisCreating(false);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        className="bg_common_button"
        onClick={handleOpen}
      >
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h5>Add New Material </h5>
            <hr />
            <form onSubmit={(e) => addMaterial(e)}>
              <div className="mb-4">
                <label>Name</label>
                <input
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  required
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-4">
                <label>Price Per Unit</label>
                <input
                  onChange={(e) => setpricePerUnit(e.target.value)}
                  value={pricePerUnit}
                  required
                  type="Number"
                  className="form-control"
                />
              </div>
              <div className="mb-4">
                <label>Default Unit</label>
                <input
                  onChange={(e) => setdefaultUnitAmount(e.target.value)}
                  value={defaultUnitAmount}
                  required
                  type="number"
                  className="form-control"
                />
              </div>
              {isCreating ? (
                <Button type="submit" variant="outlined">
                  Creating ...
                </Button>
              ) : (
                <Button type="submit" variant="outlined">
                  Create
                </Button>
              )}
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
