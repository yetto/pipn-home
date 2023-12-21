"use client";
import { TextField } from '@radix-ui/themes';
import {yupResolver} from '@hookform/resolvers/yup'
import signupSchema from '../utils/validations/signup'
import PageHeader from "../components/PageHeader";
import { useForm } from 'react-hook-form'
import InputForm from "../components/InputForm/InputForm";

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors: error },
    getValues
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onBlur'
  })
  
  const onSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <div>
      <PageHeader heading="Realiza tu registro, con informacion veridica"/>
     <form onSubmit={handleSubmit(onSubmit)} >
      <div className="grid md:grid-cols-2 items-center gap-0 sm:text-center">
          <InputForm error={error} getValues={getValues} name='email' register={register} placeholder='Correo electronico' />
          <InputForm error={error} getValues={getValues} name='name' register={register} placeholder='Nombre' />
          <InputForm error={error} getValues={getValues} name='lastName' register={register} placeholder='Apellido Paterno' />
          <InputForm error={error} getValues={getValues} name='secondLastName' register={register} placeholder='Apellido Materno' />
          <InputForm error={error} getValues={getValues} name='phone' register={register} placeholder='Telefono' />
      </div>
      <PageHeader heading="Elige tu horario"/>

      <div className='text-center'>
        <button
          type="button"
          className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 dark:bg-yellow-400 dark:text-gray-900">
                Siguiente
        </button> 
      </div>
      </form>
    </div>
  );
}
