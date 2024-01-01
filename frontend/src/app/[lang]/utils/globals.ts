const urlBase = process.env.NEXT_PUBLIC_URL_SERVER;
// =================================================
// === Endpoints
// =================================================
const urlRegisterPresentialExamCash = urlBase + '/api/unpr/exams/register/';
const urlRegisterTalk = urlBase + '/api/unpr/talks/register/';
const urlGroupsTalks = urlBase + '/api/unpr/talks/groups';
const urlGroups = urlBase + '/api/unpr/groups';
const urlCourses = urlBase + '/api/unpr/courses';


export {
    urlRegisterPresentialExamCash,
    urlRegisterTalk,
    urlGroups,
    urlGroupsTalks,
    urlCourses
};