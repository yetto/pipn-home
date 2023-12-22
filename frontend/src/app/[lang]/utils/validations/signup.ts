import * as yup from 'yup';

const signupSchema = yup.object().shape({
  email: yup.string().email().required("El email es requerido"),
  name: yup.string().min(3).max(255).required(),
  lastName: yup.string().min(3).max(255).required(),
});

export default signupSchema;