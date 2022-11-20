import * as yup from "yup";
export const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, "2 characters minimum")
    .max(50, "50 characters max")
    .required("This field is requiered"),
  calories: yup
    .number()
    .required("This field is requiered")
    .typeError("This field must contain only number"),
  fat: yup
    .number()
    .required("This field is requiered")
    .typeError("This field must contain only number"),
  carbs: yup
    .number()
    .typeError("This field must contain only number")
    .required("This field is requiered"),
  protein: yup
    .number()
    .required("This field is requiered")
    .typeError("This field must contain only number"),
});
