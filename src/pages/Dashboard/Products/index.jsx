import { Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { memo, useEffect, useState } from "react";
import ProductsList from "../../../components/List";
import { Channels, ProductRPC } from "../../../constants";
import { useSocket } from "../../../hooks/useSocket";
import { useUser } from "../../../hooks/useUser";

const Products = ({ list }) => {
  const { user } = useUser();
  const socket = useSocket();
  const [config, setConfig] = useState({
    rowHeight: 50,
    rowCount: list.length,
    overscanRowCount: 10,
    showScrollingPlaceholder: false,
    useDynamicRowHeight: false,
  });
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      rowCount: list.length,
    }));
  }, [list]);

  const handleClose = () => {
    setOpen(false);
  };

  const makeABet = () => {
    if (!product) {
      handleClose();
      return;
    }

    socket.emit(Channels.Products, {
      method: ProductRPC.Bet,
      args: { product_id: product.id, amount },
    });

    setProduct(null);
    setAmount(0);
    handleClose();
  };

  const startABet = (product) => {
    setProduct(product);
    setAmount(product.currentBid + 1);
    setOpen(true);
  };

  return (
    <>
      <ProductsList
        isBet={!!user}
        onBet={startABet}
        list={list}
        config={config}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Set your Bet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Last Bet: {(product && product.currentBid) || 0}
          </DialogContentText>
          <TextField
            autoFocus
            type="number"
            margin="dense"
            onChange={(event) => {
              const bit = +event.target.value;
              setAmount(bit);
            }}
            value={amount}
            label="type amount here"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={makeABet} color="primary">
            Make a Bet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(Products);
