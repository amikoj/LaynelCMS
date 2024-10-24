import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function Page({params }: any) {

  const { t, lang } = useTranslation();
  return <div>Hello World: {lang}</div>;
}