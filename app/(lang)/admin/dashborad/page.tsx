import React from "react";
import useTranslation from "next-translate/useTranslation";


const DashboradPage: React.FC = () => {
  const { t, lang } = useTranslation("admin");
  return <div> Dashborad Page: {lang} </div>;
}


export default DashboradPage