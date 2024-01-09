import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import base64Logo2 from "./base64Logo";
import { formatDate, formatHour } from "../../../utils/functions";

const days = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

async function generateTalk(body) {
  const student = body.userTalks;
  const talkInfo = body.talk;
  const time = "";
  const defaultAddress =
    "\n Av. Wilfrido Massieu 684,\nCol. Nueva Industrial Vallejo\nGustavo A. Madero, Ciudad de México\nCP. 07739\n";
  const directionNew = talkInfo?.classRoom?.location
    ? talkInfo.classRoom.location
    : undefined;
  const adressTalk =
    directionNew !== undefined
      ? `\n ${directionNew.street} #${
          directionNew.number ? directionNew.number : ""
        } \n${directionNew.district} \nCP. ${
          directionNew.postalCode
            ? String(directionNew.postalCode).length <= 5
              ? "0" + directionNew.postalCode
              : directionNew.postalCode
            : ""
        }`
      : defaultAddress;
  const googleAdress =
    "http://www.google.com/maps/place/" +
    talkInfo?.classRoom?.location?.latitude +
    "," +
    talkInfo?.classRoom?.location.longitude;

  let opts = {
    pageSize: "LETTER",
    info: {
      title: "Comprobante",
      author: "PreparaciónPolitécnico",
      subject: "Other",
      keywords: "comprobante",
    },
    content: [],
  };
  opts.styles = {
    header: {
      fontSize: 18,
      margin: [10, 0, 10, 0],
    },
    text: {
      fontSize: 11,
      alignment: "justify",
      margin: [10, -5, 10, -5],
      lineHeight: 1.5,
    },
    bold: {
      fontSize: 11,
      bold: true,
    },
    boldRed: {
      fontSize: 11,
      bold: true,
      margin: [10, 0, 10, 0],
    },
    link: {
      fontSize: 11,
      color: "blue",
      margin: [10, 0, 10, 0],
    },
    image: {
      alignment: "center",
    },
    imageQR: {
      alignment: "right",
    },
  };
  opts.info["title"] = "Ficha Plática";
  opts.info["keywords"] = "Ficha";

  opts.content.push({
    layout: "noBorders",
    table: {
      headerRows: 1,
      widths: [550, "*", "*", "*"],
      body: [
        [
          { image: base64Logo2, width: 170, style: "image" },
          { qr: String(student._id), fit: "100", style: "imageQR" },
        ],
      ],
    },
  });

  opts.content.push({
    text: "\nFicha de registro\n",
    style: "header",
  });

  opts.content.push({
    text: [
      "\nFecha de la plática: ",
      {
        text: `${formatDate(talkInfo.date)}`,
        style: "bold",
      },
    ],
    style: "text",
  });

  opts.content.push({
    text: [
      "\nHola ",
      {
        text: student.name + " " + student.lastName,
        style: "bold",
      },
    ],
    style: "text",
  });

  opts.content.push({
    text: [
      `\n\nTe has registrado correctamente para asistir a nuestra plática informativa el día ${
        days[talkInfo.schedules[0].day]
      } a las ${formatHour(String(talkInfo.schedules[0].startHour))}`,
      { text: time, style: "boldRed" },
      " en Preparación Politécnico. Asiste y realiza un examen simulacro. Aprenderás técnicas para resolverlo más rápido. ",
      { text: "La plática durará 2:15 horas.", style: "boldRed" },
    ],
    style: "text",
  });

  opts.content.push({
    text: [
      {
        text: "\n\nSe tomarán todas las medidas sanitarias sin excepción alguna:\n",
        style: "bold",
      },
      "- Toma de temperatura\n- Aplicación de gel antibacterial\n- Sana distancia\n- Uso obligatorio de cubre bocas y de ser posible, careta",
    ],
    style: "text",
  });

  opts.content.push({
    text: [
      { text: "\n\nApunta nuestra dirección:", style: "bold" },
      adressTalk,
    ],
    style: "text",
  });

  opts.content.push({
    text: [
      { text: "\nGoogle Maps: ", style: "bold" },
      { text: googleAdress, style: "link", link: googleAdress },
    ],
    style: "text",
    lineHeight: 1,
  });
  opts.content.push({
    text: "\n\n\n\n\n\nIndicaciones finales:",
    style: "boldRed",
  });

  opts.content.push({
    text: [
      "\nDeberás llegar con 30 minutos de anticipación, recuerda que no hay estacionamiento. Saliendo de metro Politécnico encontrarás compañeros guías para orientarles",
    ],
    style: "text",
  });

  opts.content.push({
    text: "\n\n\nCualquier duda o inconveniente puedes comunicarte al (55) 8848 3185 o vía INBOX:",
    style: "text",
    lineHeight: 1,
  });

  opts.content.push({
    text: "\nhttps://www.facebook.com/PreparacionPolitécnico",
    link: "https://www.facebook.com/PreparacionIPN",
    style: "link",
  });

  const { vfs } = pdfFonts.pdfMake;
  pdfMake.vfs = vfs;

  const pdf = pdfMake.createPdf(opts);
  pdf.download("comprobante.pdf");
}

export { generateTalk };
