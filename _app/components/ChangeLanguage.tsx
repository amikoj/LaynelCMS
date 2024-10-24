import React from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import i18nConfig from '@/i18n.js'

const { locales } = i18nConfig

export default function ChangeLanguage() {
  const { t, lang } = useTranslation()

  return locales.map((lng) => {
    if (lng === lang) return null

    return (
      <Link href="/" locale={lng} key={lng}>
        {t(`layout:language-name-${lng}`)}
      </Link>
    )
  })
}