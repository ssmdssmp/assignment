import { useFormik } from 'formik';
import { addRow, setRows } from '../../reducers/tableSlice';
import * as yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createNewItem } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, '2 characters minimum')
    .max(50, '50 characters max')
    .required('This field is requiered'),
  calories: yup
    .number()
    .required('This field is requiered')
    .typeError('This field must contain only number'),
    fat: yup.number()
    .required('This field is requiered')
    .typeError('This field must contain only number'),
    carbs: yup.number()
    .typeError('This field must contain only number')
    .required('This field is requiered'),
    protein: yup
    .number()
    .required('This field is requiered')
    .typeError('This field must contain only number'),
    
    
});

export const MainForm = () => {
  const dispatch = useDispatch();
  const rows:[any] = useSelector(({table}:any) => table.rows);
  const nextId = useSelector(({table}:any)=> table.nextId);
  const formik = useFormik({
    initialValues: {
      id:'',
      name: '',
      calories: '',
      fat:'',
      carbs:'',
      protein:''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // @ts-ignore
      values.id = nextId;
      createNewItem(values);
      // @ts-ignore
      dispatch(addRow(values));
      setRows();
    },
  });

  return (
    <div className='form-wrapper'>
      
      <form className='main-form' onSubmit={formik.handleSubmit}>
      <h3>Create New Item</h3>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="calories"
          name="calories"
          label="Calories (g)"
          value={formik.values.calories}
          onChange={formik.handleChange}
          error={formik.touched.calories && Boolean(formik.errors.calories)}
          helperText={formik.touched.calories && formik.errors.calories}
        />
       
         <TextField
          fullWidth
          id="carbs"
          name="carbs"
          label="Carbs (g)"
          value={formik.values.carbs}
          onChange={formik.handleChange}
          error={formik.touched.carbs && Boolean(formik.errors.carbs)}
          helperText={formik.touched.carbs && formik.errors.carbs}
        />
          <TextField
          fullWidth
          id="fat"
          name="fat"
          label="Fat (g)"
          value={formik.values.fat}
          onChange={formik.handleChange}
          error={formik.touched.fat && Boolean(formik.errors.fat)}
          helperText={formik.touched.fat && formik.errors.fat}
        />
         <TextField
          fullWidth
          id="protein"
          name="protein"
          label="Protein (g)"
          value={formik.values.protein}
          onChange={formik.handleChange}
          error={formik.touched.protein && Boolean(formik.errors.protein)}
          helperText={formik.touched.protein && formik.errors.protein}
        />
        <Button sx={{height:56}} color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};


