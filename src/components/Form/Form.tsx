import { useFormik } from "formik";
import { addRow, setRows } from "../../reducers/tableSlice";
import { validationSchema } from "./validationSchema";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createNewItem } from "../../hooks/requests";
import { useDispatch, useSelector } from "react-redux";
import { handleIsOpenForm } from "../../reducers/tableSlice";
import { formText, globalText } from "../../textData";
export const MainForm = () => {
  const dispatch = useDispatch();
  const nextId = useSelector(({ table }: any) => table.nextId);

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      calories: "",
      fat: "",
      carbs: "",
      protein: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.id = nextId;
      createNewItem(values);
      //@ts-ignore
      dispatch(addRow(values));
      dispatch(handleIsOpenForm());
      setRows();
    },
  });

  return (
    <div className="form-wrapper">
      <form className="main-form" onSubmit={formik.handleSubmit}>
        <h3>{globalText.create}</h3>
        <TextField
          fullWidth
          id="name"
          name="name"
          label={formText.name}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="calories"
          name="calories"
          label={formText.calories}
          value={formik.values.calories}
          onChange={formik.handleChange}
          error={formik.touched.calories && Boolean(formik.errors.calories)}
          helperText={formik.touched.calories && formik.errors.calories}
        />
        <TextField
          fullWidth
          id="carbs"
          name="carbs"
          label={formText.carbs}
          value={formik.values.carbs}
          onChange={formik.handleChange}
          error={formik.touched.carbs && Boolean(formik.errors.carbs)}
          helperText={formik.touched.carbs && formik.errors.carbs}
        />
        <TextField
          fullWidth
          id="fat"
          name="fat"
          label={formText.fat}
          value={formik.values.fat}
          onChange={formik.handleChange}
          error={formik.touched.fat && Boolean(formik.errors.fat)}
          helperText={formik.touched.fat && formik.errors.fat}
        />
        <TextField
          fullWidth
          id="protein"
          name="protein"
          label={formText.protein}
          value={formik.values.protein}
          onChange={formik.handleChange}
          error={formik.touched.protein && Boolean(formik.errors.protein)}
          helperText={formik.touched.protein && formik.errors.protein}
        />
        <Button
          sx={{ height: 56, borderRadius: 10 }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          {globalText.submit}
        </Button>
      </form>
    </div>
  );
};
