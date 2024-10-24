// pages/404.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
 
export default function Custom404() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
 
  useEffect(() => {
    // 如果当前语言不是默认语言，尝试切换到默认语言
    if (i18n.language !== i18n.options.fallbackLanguage) {
      i18n.changeLanguage(i18n.options.fallbackLanguage, () => {
        router.push(router.asPath, undefined, { shallow: true });
      });
    }
  }, [i18n, router]);
 
  return (
    <div>
      <h1>{t('404-title')}</h1>
      <p>{t('404-message')}</p>
    </div>
  );
}