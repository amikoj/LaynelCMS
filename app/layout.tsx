import '@/app/styles/global.css'

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return <html lang="en">
        <body className="bg-gray-50">
            {children}
        </body>
    </html>
}