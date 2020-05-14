/**
 *网页加水印 svg 方式
 *
 * @export
 * @param {*} [{
 *   container = document.body,
 *   content = '请勿外传',
 *   width = '300px',
 *   height = '200px',
 *   opacity = '0.2',
 *   fontSize = '20px',
 *   zIndex = 1000
 * }={}]
 */
export function __waterDocumentSvg({
  container = document.body,
  content = '请勿外传',
  width = '300px',
  height = '200px',
  opacity = '0.2',
  fontSize = '20px',
  zIndex = 1000
} = {}) {
  const args = arguments[0];
  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${width}">
<text x="50%" y="50%" dy="12px"
text-anchor="middle"
stroke="#000000"
stroke-width="1"
stroke-opacity="${opacity}"
fill="none"
transform="rotate(-45, 120 120)"
style="font-size: ${fontSize};">
${content}
</text>
</svg>`;
  const base64Url = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
  const __wm = document.querySelector('.__wm');
  const watermarkDiv = __wm || document.createElement("div");
  const styleStr = `
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}')`;
  watermarkDiv.setAttribute('style', styleStr);
  watermarkDiv.classList.add('__wm');
  if (!__wm) {
    container.style.position = 'relative';
    container.insertBefore(watermarkDiv, container.firstChild);
  }
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  if (MutationObserver) {
    let mo = new MutationObserver(function () {
      const __wm = document.querySelector('.__wm');
      // 只在__wm元素变动才重新调用 __canvasWM
      if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
        // 避免一直触发
        mo.disconnect();
        mo = null;
        __waterDocumentSvg(JSON.parse(JSON.stringify(args)));
      }
    });
    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true
    })
  }
}