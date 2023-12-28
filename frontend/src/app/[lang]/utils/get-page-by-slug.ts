import {fetchAPI} from "@/app/[lang]/utils/fetch-api";

export async function getPageBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/pages`;
    // const urlParamsObject = {filters: {slug}, locale: lang}; // ::TODO:: Add support for other locales
    const urlParamsObject = {filters: {slug}, locale: 'en'};
    const options = {headers: {Authorization: `Bearer ${token}`}};
    return await fetchAPI(path, urlParamsObject, options);
}