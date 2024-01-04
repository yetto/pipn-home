import React from "react";
import s from "./TalkSuccess.module.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Text } from "@radix-ui/themes";
import { generateTalk } from "./components/generatePdf";

interface TalkSuccessProps {
  groupTalk: any;
}

const TalkSuccess = (props: TalkSuccessProps) => {
  const { groupTalk } = props;
  const newPosition = {
    lat: groupTalk?.classRoom?.location?.latitude
      ? Number(groupTalk.classRoom.location.latitude)
      : 19.4961144,
    lng: groupTalk?.classRoom?.location?.longitude
      ? Number(groupTalk.classRoom.location.longitude)
      : -99.14094,
  };
  const token = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
  const handleOnDownload = async () => {
    await generateTalk(groupTalk);
  };
  return (
    <div className="grid lg:grid-cols-6">
      <div className={s.container}>
        <LoadScript googleMapsApiKey={token}>
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "400px",
            }}
            center={newPosition}
            zoom={16}
            options={{
              fullscreenControl: true,
              mapTypeControl: false,
            }}
          >
            <Marker position={newPosition} />
          </GoogleMap>
        </LoadScript>
      </div>
      <div className={s.RithContainer}>
        <Text as="div" size="3" weight="bold">
          Tus datos han sido registrados correctamente en nuestro sistema y
          estás a punto de asistir a nuestra plática informativa.
        </Text>
        <Text as="div" size="9" weight="bold" className="mt-[3rem]">
          Apunta nuestra dirección:
        </Text>
        <Text as="div" size="3" weight="bold">
          Av. Wilfrido Massieu #684 Gustavo A. Madero
        </Text>
        <div className={s.buttonContainer}>
          <button
            onClick={handleOnDownload}
            className="w-2/5 p-3 font-semibold rounded sm:w-1/3 bg-yellow-400 text-gray-900"
          >
            Descargar comprobante
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalkSuccess;
