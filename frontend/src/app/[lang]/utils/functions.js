import moment from "moment";

//genera un formato para los schedules
export const semanaDias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const twoLettersWeek = (schedules) => {
  schedules.forEach((horario) => {
    switch (horario.day.toString()) {
      case "0":
        horario.day = semanaDias[horario.day];
        break;

      case "1":
        horario.day = semanaDias[horario.day];
        break;

      case "2":
        horario.day = semanaDias[horario.day];
        break;

      case "3":
        horario.day = semanaDias[horario.day];
        break;

      case "4":
        horario.day = semanaDias[horario.day];
        break;
      case "5":
        horario.day = semanaDias[horario.day];
        break;

      case "6":
        horario.day = semanaDias[horario.day];
        break;
      default:
        break;
    }
  });
  return schedules;
};

//agrega dos puntos a la hora 0930 =  09:30
const formatoHora = (hora) => {
  let uno = hora.slice(0, 2);
  let dos = hora.slice(2, 4);
  return uno + ":" + dos;
};

export const newSchedules = (cell, row) => {
  const cellCopy = cell.map((a) => ({ ...a }));
  let compiladoDias = "";
  let horarioFinal = [];
  let horario = "";
  let horarios = twoLettersWeek(cellCopy);
  //elimina los horarios duplicados
  const filteredArr = horarios.reduce((acc, current) => {
    const x = acc.find((item) => item.startHour === current.startHour);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  //guarda los dias por horario
  filteredArr.forEach((dato) => {
    let grupoHorarios = [];
    for (let i = 0; i < horarios.length; i++) {
      if (dato.startHour === horarios[i].startHour) {
        grupoHorarios.push(horarios[i]);
      }
    }
    horarioFinal.push(grupoHorarios);
  });
  //genera un compilado de dias por horario

  horarioFinal.forEach((value) => {
    horario =
      /* "Horario: " + */
      formatoHora(value[0].startHour) + " a " + formatoHora(value[0].endHour);
    for (let i = 0; i < value.length - 1; i++) {
      compiladoDias = compiladoDias + value[i].day + ", ";
    }

    compiladoDias = compiladoDias + value[value.length - 1].day;
    /* compiladoDias = compiladoDias + " " + horas + "_"; */
  });
  let partes = compiladoDias.split("_");
  return partes.map((value) => {
    value;
    const data = {
      inLabels: 
        <>
          <p>{compiladoDias}</p>
          <p>{horario}</p>
        </>,
        horario:horario,
        compiladoDias:compiladoDias,
    };
    return data;
  });
};

export const formatDate = (stringDate) => {
  return moment(stringDate).format("DD/MM/YYYY");
};
export const formatHour = (hour) => {
  return moment(hour, "HHmm").format("hh:mm A");
};

export const formatHourPdf = (talk) => {
  moment.locale("es");
  let formatedDate = moment(talk.date).format("DD/MM/YYYY");
  let prov = moment(talk.schedules[0].startHour, "HHmm").format("hh:mm A");
  formatedDate = `${moment(talk.date).format("dddd")} ${formatedDate} ${prov}`;
  return formatedDate;
};

export const showDate = (_date) => {
  if (_date) {
    let date = moment(new Date(_date)).format("DD/MM/YYYY");
    return <span>{`${date}`}</span>;
  } else {
    return "";
  }
};

export const getBase64 = async (urlImg) => {
  const xhr = new XMLHttpRequest();
  const promiseResult = new Promise((resolve, reject) => {
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
        return reader.result;
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", urlImg);
    xhr.responseType = "blob";
    xhr.send();
  });
  return await promiseResult;
};
