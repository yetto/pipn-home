import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { getBase64 } from "../functions";

export async function generateTalkPdf(student, image, course) {
  const { name = "", lastName = "" } = student;

  const imageTicket = await getBase64(image);

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
  opts.info["title"] = "Comprobante inscripción";
  opts.info["keywords"] = "Comprobante";

  opts.content.push({
    text: "\nFicha de registro\n",
    style: "header",
  });
  opts.content.push({
    text: [
      "\n¡Felicidades! ",
      {
        text: name + " " + lastName,
        style: "bold",
      },
    ],
    style: "text",
  });

  opts.content.push({
    text: [
      "\nTe registraste con éxito a " +
        course.name +
        " de Preparación Politécnico. Realiza tu pago por transferencia o depósito bancario, aquí esta nuestro número de cuenta:",
    ],
    style: "text",
  });

  opts.content.push({
    text: ["\nBBVA Bancomer"],
    style: "text",
  });
  opts.content.push({
    text: ["\nCantidad a pagar: $" + course.price],
    style: "text",
  });

  opts.content.push({
    text: ["\nNo. de cuenta: 01-9789-6115"],
    style: "text",
  });

  opts.content.push({
    text: ["\nClabe: 012180001978961159"],
    style: "text",
  });

  opts.content.push({
    text: "\n\n1. En caso de realizar tu pago por depósito bancario:",
    style: "boldRed",
  });
  opts.content.push({
    text: [
      "\nEn el ticket deberás escribir tu NOMBRE y CORREO (ver imagen) . Tómale una FOTO y envíala por correo electrónico:",
    ],
    style: "text",
  });

  opts.content.push({
    text: ["\npagos.preparacion@gmail.com"],
    style: "text",
  });

  opts.content.push({
    layout: "noBorders",
    table: {
      headerRows: 1,
      widths: [400, "*", "*", "*"],
      body: [[{ image: imageTicket, width: 200, style: "image" }]],
    },
  });

  opts.content.push({
    text: "\n\n2. En caso de realizar transferencia bancaria:",
    style: "boldRed",
  });

  opts.content.push({
    text: [
      "\nEn “motivo o concepto de pago” deberás colocar tu NOMBRE y APELLIDO PATERNO. Toma una captura de pantalla donde se visualice que el movimiento fue aprobado y envíala por correo eletrónico:",
    ],
    style: "text",
  });
  opts.content.push({
    text: ["\npagos.preparacion@gmail.com"],
    style: "text",
  });
  opts.content.push({
    text: "\nCualquier duda o inconveniente puedes comunicarte al (55) 8848 3185 o vía INBOX:",
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
