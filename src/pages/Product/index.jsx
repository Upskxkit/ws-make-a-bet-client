import DateFnsUtils from "@date-io/date-fns";
import { yupResolver } from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import format from "date-fns/format";
import React, { useEffect, useRef, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
import { Channels, ProductRPC } from "../../constants";
import { useSocket } from "../../hooks/useSocket";
import { Flex } from "../../styles/styled";
import { schema } from "./form.schema";
import { ProductToolbar, ProductWrapper } from "./styled";

export function Product() {
  const socket = useSocket();
  const history = useHistory();
  const date = useRef(format(new Date(), "dd/MM/yyyy"));
  const {
    register,
    handleSubmit,
    control,
    errors,
    setValue,
    watch,
    formState,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      bidStart: new Date(),
      bidEnd: null,
      currentBid: 0,
    },
    resolver: yupResolver(schema),
  });

  const handleDateChange = () => {};

  const onSubmit = (product) => {};

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ProductWrapper>
        <ProductToolbar>
          <Typography color="primary" variant="h5">
            New Product
          </Typography>
          <div className="flex flex-ai-center">
            <Typography component="h4" variant="subtitle1">
              {date.current}
            </Typography>
            <div className="splitter" />
          </div>
        </ProductToolbar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            {/*<div>
              <label>Started Bit Date</label>
              <KeyboardDatePicker
                id="bidStart"
                name="bidStart"
                format="dd.MM.yyyy"
                disablePast
                margin="normal"
                disableToolbar
                fullWidth
                value={bidStart}
                onChange={handleDateChange("bidStart")}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                error={errors.hasOwnProperty("bidStart")}
                helperText={errors.bidStart && errors.bidStart.message}
              />
            </div>*/}
          </Flex>

          <Flex alignCenter justifyCenter>
            <Button
              variant="outlined"
              color="primary"
              disabled={!formState.isValid}
              type="submit"
            >
              Submit
            </Button>
          </Flex>
        </form>
      </ProductWrapper>
    </MuiPickersUtilsProvider>
  );
}
