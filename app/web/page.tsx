import Link from 'next/link';

const Home = () => {
    return (
        <main className="space-y-10 [&_>*]:block">
            <Link href="/en/demo">demo</Link>
            <Link href="/zh/detail">detail</Link>
            <Link href="/ja/list">list</Link>
            <Link href="/ko/post">post</Link>
        </main>
    );
};

export default Home;