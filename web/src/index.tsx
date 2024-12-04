import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
const Loading = () => {
    return (<div className="flex items-center justify-center w-full h-full">
        <div className="text-center text-gray-500">加载中...</div>
    </div>);
}

const Main = () => {
    return <div className="flex flex-col h-screen">
    </div>;
};

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Main />);
