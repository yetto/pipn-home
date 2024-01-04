"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import signupSchema from "../../utils/validations/signup";
import PageHeader from "../../components/PageHeader";
import { useForm } from "react-hook-form";
import InputForm from "../../components/InputForm/InputForm";
import Calendar from "../Calendar/Calendar";
import CalendarTalks from "../CalendarTalks/CalendarTalks";
import s from "./Signup.module.css";
import { Text } from "@radix-ui/themes";

interface ISignup {
  onSubmitForm: (data: any) => void;
  courseGroups?: any;
  talksGroups?: any;
}

const Signup = (props: ISignup) => {
  const { onSubmitForm, courseGroups, talksGroups } = props;

  const {
    register,
    handleSubmit,
    formState: { errors: error },
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <PageHeader heading="Horario(s)" />
        {courseGroups && courseGroups.length > 0 && (
          <div className="flex flex-wrap items-stretch max-w-5xl mx-auto justify-center">
            {courseGroups.map((group: any) => {
              return (
                <Calendar
                  key={group.id}
                  item={group}
                  setValue={setValue}
                  watch={watch}
                />
              );
            })}
          </div>
        )}
        {talksGroups && talksGroups.length > 0 && (
          <div className="flex flex-wrap items-stretch max-w-5xl mx-auto justify-center">
            {talksGroups.map((talks: any) => {
              return (
                <CalendarTalks
                  watch={watch}
                  setValue={setValue}
                  key={talks.id}
                  item={talks}
                />
              );
            })}
          </div>
        )}

        <PageHeader heading="Realiza tu registro" />
        <div className={s.container}>
          <div className="w-full lg:w-1/2 lg:mx-0 lg:mb-0">
            <Text className="my-4 text-2xl font-bold text-yellow-500">
              {" "}
              Nombre{" "}
            </Text>
            <InputForm
              error={error}
              getValues={getValues}
              name="name"
              register={register}
              placeholder="Nombre"
            />
          </div>
          <div className="w-full lg:w-1/2 lg:mx-0 lg:mb-0">
            <Text className="my-4 text-2xl font-bold text-yellow-500">
              {" "}
              Apellidos{" "}
            </Text>
            <div className="grid lg:grid-cols-2 lg:w-[470px] lg:ml-[20px]">
              <InputForm
                error={error}
                getValues={getValues}
                name="lastName"
                register={register}
                placeholder="Apellido Paterno"
              />
              <InputForm
                error={error}
                getValues={getValues}
                name="secondLastName"
                register={register}
                placeholder="Apellido Materno"
              />
            </div>
          </div>
        </div>
        <div className={s.container}>
          <div className="w-full lg:w-1/2 lg:mx-0 lg:mb-0">
            <Text className="my-4 text-2xl font-bold text-yellow-500">
              {" "}
              Correo{" "}
            </Text>
            <InputForm
              error={error}
              getValues={getValues}
              name="email"
              register={register}
              placeholder="Correo Electrónico"
            />
          </div>
          <div className="w-full lg:w-1/2 lg:mx-0 lg:mb-0">
            <Text className="my-4 text-2xl font-bold text-yellow-500">
              {" "}
              Teléfonos{" "}
            </Text>
            <InputForm
              error={error}
              getValues={getValues}
              name="phone"
              register={register}
              placeholder="Teléfono"
            />
            <InputForm
              error={error}
              getValues={getValues}
              name="secondPhone"
              register={register}
              placeholder="Segundo Teléfono de Contacto"
            />
          </div>
        </div>
        <div className={s.buttonContainer}>
          <button
            type="submit"
            className="w-2/5 p-3 font-semibold rounded sm:w-1/3 bg-yellow-400 text-gray-900"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
