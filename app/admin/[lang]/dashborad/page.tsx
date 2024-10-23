import useTranslation from 'next-translate/useTranslation';
import React from'react';

export const Page = () => {

    const { t, lang } = useTranslation('common');
    const example = t('title', { count: 42 })
    return <div> Dashborad {example}</div>
};

export default Page;
