//提示信息 封装
export function Toast(msg, duration) {
  duration = isNaN(duration) ? 3000 : duration;
  const m = document.createElement("div");
  m.innerHTML = msg;
  m.style.cssText =
    "font-size: .32rem;color: rgb(255, 255, 255);background-color: rgba(0, 0, 0, 0.6);padding: 10px 15px;margin: 0 0 0 -60px;border-radius: 4px;position: fixed;    top: 50%;left: 50%;width: 130px;text-align: center;";
  document.body.appendChild(m);
  setTimeout(function () {
    const d = 0.5;
    m.style.opacity = "0";
    setTimeout(function () {
      document.body.removeChild(m);
    }, d * 1000);
  }, duration);
}

const encodeNames = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&#039;": "'",
};

export const decodeName = (str = "") =>
  str?.replace(
    /(?:&amp;|&lt;|&gt;|&quot;|&apos;|&#039;)/gm,
    (s) => encodeNames[s],
  );
