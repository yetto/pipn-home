"use client";
import {yupResolver} from '@hookform/resolvers/yup'
import signupSchema from '../../utils/validations/signup'
import PageHeader from "../../components/PageHeader";
import { useForm } from 'react-hook-form'
import InputForm from "../../components/InputForm/InputForm";
import { useEffect } from 'react';
import { useParams } from 'next/navigation'
import { 
  urlRegisterPresentialExamCash,
  urlRegisterTalk,
  urlGroups,
  urlGroupsTalks,
  urlCourses 
} from "../../utils/globals";
import fetcher from "../../utils/fetcher";
import { useSearchParams } from 'next/navigation'



const Checkout= () => {
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

  const params = useParams();
  const searchParams = useSearchParams()

  
  const onSubmit = async (data: any) => {
    console.log(data)
    
  }

  const handleOnSelectBaseUrl = (course:string | null) => {
    if(course === "registerPresentialExam"){
      return urlRegisterPresentialExamCash
    }
    if(course === "talk"){
      return urlRegisterTalk
    }
    if(course === "groupsTalks"){
      return urlGroupsTalks
    }
    if(course === "groups"){
      return urlGroups
    }
    if(course === "course"){
      return urlCourses
    }
    return null
  }

  useEffect(() => {
    if(params){
      const course = searchParams.get('course')
      const baseUrl = handleOnSelectBaseUrl(course)
      if(!baseUrl || !params.id){
        window.location.href = '/'
      }
      let url = `${baseUrl}/${params.id}`;
      fetcher(url, { method: "GET" })
        .then((res: any) => {
          if (res.success) {
            const { course = {}, groups = [] } = res;
            console.log(course);
            console.log(groups);
            console.log(res)
          } else {
            console.log(res);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [params])


  
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
          type="submit"
          className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 dark:bg-yellow-400 dark:text-gray-900">
                Siguiente
        </button> 
      </div>
      </form>
    </div>
  );
}

export default Checkout;