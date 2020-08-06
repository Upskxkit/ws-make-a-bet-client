import DateFnsUtils from "@date-io/date-fns";
import { yupResolver } from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import format from "date-fns/format";
import React, { useEffect, useRef, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
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
  const { bidStart, bidEnd } = watch();


  const socketListener = useCallback(
    (data) => {
      const { method, args } = data;

      if (method !== ProductRPC.Create) {
        return;
      }

      if ("error" in args) {
        toast.error(args.error);
      } else {
        toast.success(`product "${args.title}" created.`);
        history.push("/");
      }
    },
    [socket]
  );

  useEffect(() => {
    socket.on(Channels.Products, socketListener);

    return () => {
      socket.off(Channels.Products, socketListener);
    };
  }, []);

  useEffect(() => {
    register({ name: "bidStart", type: "text" });
    register({ name: "bidEnd", type: "text" });
  }, []);

  const handleDateChange = (name) => (date) => {
    if (date) {
      setValue(name, date);
    }
  };

  const onSubmit = (product) => {
    socket.emit(Channels.Products, {
      method: ProductRPC.Create,
      args: product,
    });
  };

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
          <label>Title</label>
          <Controller
            as={TextField}
            name="title"
            className="m-b-10"
            control={control}
            fullWidth
            error={errors.hasOwnProperty("title")}
            helperText={errors?.title?.message}
          />
          <label>Description</label>
          <Controller
            as={TextField}
            name="description"
            multiline
            className="m-b-10"
            fullWidth
            rows={4}
            control={control}
            error={errors.hasOwnProperty("description")}
            helperText={errors?.description?.message}
          />
          <Flex>
            <div>
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
            </div>
            <div>
              <label>End Bit Date</label>
              <KeyboardDatePicker
                id="bidEnd"
                name="bidEnd"
                format="dd.MM.yyyy"
                disablePast
                margin="normal"
                disableToolbar
                fullWidth
                value={bidEnd}
                onChange={handleDateChange("bidEnd")}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                error={errors.hasOwnProperty("bidEnd")}
                helperText={errors.bidEnd && errors.bidEnd.message}
              />
            </div>
          </Flex>
          <label>Started price</label>
          <Controller
            as={TextField}
            type="number"
            InputLabelProps={{ shrink: true }}
            name="currentBid"
            className="m-b-10"
            control={control}
            fullWidth
            error={errors.hasOwnProperty("startingBid")}
            helperText={errors?.currentBid?.message}
          />
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
