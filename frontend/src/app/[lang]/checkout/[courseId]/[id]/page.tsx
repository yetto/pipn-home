"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  urlRegisterPresentialExamCash,
  urlRegisterTalk,
  urlGroups,
  urlGroupsTalks,
  urlCourses,
} from "../../../utils/globals";
import fetcher from "../../../utils/fetcher";
import SigNup from "../../../components/Signup/Signup";

enum Course {
  "registerPresentialExam" = "registerPresentialExam",
  "talk" = "talk",
  "groupsTalks" = "groupsTalks",
  "groups" = "groups",
  "course" = "course",
}

const Checkout = () => {
  const [courseGroups, setCourseGroups] = useState([]);
  const params = useParams();

  const handleOnSelectBaseUrl = (course: string | string[] | null) => {
    if (course === "registerPresentialExam") {
      return urlRegisterPresentialExamCash;
    }
    if (course === "talk") {
      return urlRegisterTalk;
    }
    if (course === "groupsTalks") {
      return urlGroupsTalks;
    }
    if (course === "groups") {
      return urlGroups;
    }
    if (course === "course") {
      return urlCourses;
    }
    return null;
  };

  useEffect(() => {
    if (params) {
      const course = params.courseId;
      const baseUrl = handleOnSelectBaseUrl(course);
      if (!baseUrl || !params.id) {
        window.location.href = "/";
      }
      let url = `${baseUrl}/${params.id}`;
      fetcher(url, { method: "GET" })
        .then((res: any) => {
          if (res.success) {
            const { course = {}, groups = [] } = res;
            setCourseGroups(groups);
          } else {
            window.location.href = "/";
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [params]);

  const handleOnSubitForm = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="container px-4 mx-auto">
      <SigNup
        onSubmitForm={handleOnSubitForm}
        courseGroups={courseGroups}
      />
    </div>
  );
};

export default Checkout;
