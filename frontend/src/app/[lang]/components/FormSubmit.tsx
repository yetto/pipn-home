"use client";
import { useState } from "react";
import { getStrapiURL } from "../utils/api-helpers";

export default function FormSubmit({
  placeholder,
  text,
}: {
  placeholder: string;
  text: string;
}) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit() {
    if (email === "") {
      setErrorMessage("No hay correo? 😀");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Correo invalido 😵");
      return;
    }

    const res = await fetch(getStrapiURL() + "/api/lead-form-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { email } }),
    });

    if (!res.ok) {
      setErrorMessage("No se pudo enviar 🫣");
      return;
    }
    setErrorMessage("");
    setSuccessMessage("¡Listo! ❤️");
    setEmail("");
  }

  return (
    <div className="flex flex-row items-center self-center justify-center flex-shrink-0 lg:justify-end">
      <div className="flex flex-col">
        <div className="flex flex-row">
          {successMessage ? (
            <p className="px-4 py-2 text-green-600 bg-green-200 rounded-lg">
              {successMessage}
            </p>
          ) : (
            <>
              <input
                type="email"
                placeholder={placeholder}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={"w-3/5 p-3 rounded-l-lg sm:w-2/3 text-gray-700 shadow-md"}
              />
              <button
                type="button"
                className="w-2/5 p-3 rounded-r-lg btn-primary int-rotating-element sm:w-1/3"
                onClick={handleSubmit}
              >
                {text}
              </button>
            </>
          )}
        </div>

        {errorMessage && (
          <p className="px-4 py-2 my-2 text-red-500 bg-red-100 rounded-lg">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
