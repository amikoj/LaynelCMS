import '@/app/styles/global.css'
import useTranslation from 'next-translate/useTranslation';


export default function RootLayout({ children }: any) {
    const { t } = useTranslation();

    return (
        <html lang="zh" className="h-full">
            <head>
                <title>{t('common:title')}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={t('common:description')} />
                <meta name="keywords" content={t('common:keywords')} />
                <link rel="icon" href="/favicon.ico" />
                
            </head>

            <body>
                {children}
            </body>
        </html>
    )
}