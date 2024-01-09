"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { urlGroupsTalks, urlRegisterTalk } from "../../utils/globals";
import fetcher from "../../utils/fetcher";
import SigNup from "../../components/Signup/Signup";
import TalkSuccess from "../../components/TalkSuccess/TalkSuccess";
import PageHeader from "../../components/PageHeader";

const Talks = () => {
  const [talks, setTalks] = useState([]);
  const [registerData, setRegisterData] = useState<Object | undefined>(
    undefined
  );

  const params = useParams();
  const baseUrl = urlGroupsTalks;

  useEffect(() => {
    if (params) {
      if (!baseUrl || !params.id) {
        window.location.href = "/";
      }
      let url = `${baseUrl}?courseLevel=${params.id}`;
      fetcher(url, { method: "GET" })
        .then((res: any) => {
          if (res.success) {
            const { talks = [] } = res;
            setTalks(talks);
          } else {
            window.location.href = "/";
          }
        })
        .catch((error: any) => {
          window.location.href = "/";
          console.log(error);
        });
    }
  }, [params]);

  const handleOnSubitForm = async (data: any) => {
    const payload = {
      email: data.email,
      name: data.name,
      lastName: data.lastName,
      secondLastName: data.secondLastName,
      phoneNumber: data.phone,
      secondPhoneNumber: data.secondPhone,
    };
    const res = await fetcher(urlRegisterTalk + data.calendarId, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (res.success) {
      const talk = talks.find((talk: any) => talk._id === data.calendarId);
      setRegisterData({
        talk: talk,
        userTalks: res.userTalks,
      });
    } else {
      console.log("error");
    }
  };

  return (
    <div className="container px-4 mx-auto">
      {!registerData && (
        <SigNup onSubmitForm={handleOnSubitForm} talksGroups={talks} />
      )}
      {registerData && (
        <div className="container">
          <PageHeader heading="¡Felicidades quedaste registrado a las platicas!" />
          <TalkSuccess groupTalk={registerData} />
        </div>
      )}
    </div>
  );
};

export default Talks;
