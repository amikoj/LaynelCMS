
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { c as createRoot, R as React } from './libs/react.development.js';

const Main = () => {
    return React.createElement("div", { className: "flex flex-col h-screen" });
};
const rootElement = document.getElementById("root");
createRoot(rootElement).render(React.createElement(Main, null));
