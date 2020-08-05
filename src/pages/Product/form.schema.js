import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string(),
  bidStart: yup.date().required("Required"),
  bidEnd: yup.date().typeError("Select end bid date").required("Required"),
  currentBid: yup
    .number()
    .typeError("Must be a number")
    .required("Required")
    .min(0, "Must be positive number"),
});
