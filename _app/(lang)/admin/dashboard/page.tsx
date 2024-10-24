import React from "react";
import useTranslation from "next-translate/useTranslation";


const DashboardPage: React.FC = () => {
  const { t, lang } = useTranslation("admin");
  return <div> DashboardPage Page: {lang} </div>;
}


export default DashboardPage