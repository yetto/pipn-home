import * as yup from "yup";

const phoneRegExp = /^([0-9]{10})$/;

const signupSchema = yup.object().shape({
  email: yup.string().email().required("El email es requerido"),
  name: yup
    .string()
    .min(3, "Mínimo 3 carácteres")
    .max(255)
    .required("El nombre es requerido"),
  lastName: yup
    .string()
    .min(3, "Mínimo 3 carácteres")
    .max(255)
    .required("El apellido paterno es requerido"),
  secondLastName: yup
    .string()
    .min(3, "Mínimo 3 carácteres")
    .max(255)
    .required("El apellido materno es requerido"),
  phone: yup
    .string()
    .matches(phoneRegExp, "El número de teléfono no es válido")
    .required("El teléfono es requerido"),
  secondPhone: yup
    .string()
    .matches(phoneRegExp, "El número de teléfono no es válido")
    .required("El teléfono es requerido"),
  calendarId: yup.string().required("El calendario es requerido"),
});

export default signupSchema;
