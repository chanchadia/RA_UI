const getVal = () => {
  switch(import.meta.env.VITE_APP_API_ENVIRONMENT) {
    case 'QA':
      return import.meta.env.VITE_APP_API_URL_QA;
    case 'UAT':
      return import.meta.env.VITE_APP_API_URL_UAT;
    case 'Prod':
      return import.meta.env.VITE_APP_API_URL_PROD;
    default: //Dev
    return import.meta.env.VITE_APP_API_URL_DEV;
  }
}
const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  basename: "",
  defaultPath: "/login",
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  API_URL: getVal(),
};
export default config;
