import{l as p}from"./preload-helper-DhB_op97.js";import{t as d}from"./react-Cv64OdzP.js";import{t as s}from"./emotion-styled.browser.esm-YTZgSpOx.js";import{t as m}from"./jsx-runtime-CPdzY0Ku.js";import"./src-CIbK0PmT.js";import{t as n}from"./hexToRgba-D41tBJLG.js";import"./core-DRZ7abR7.js";var l=p(d()),c={dark:.85,light:.2},f=s.div`
  ${({theme:r,type:t})=>`
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${n(r.palette.surface.dark,c[t])};
      z-index: 9;
    `}
`,k={Dark:"dark",Light:"light"},a=m(),j=(0,l.forwardRef)(({isOpen:r=!1,type:t=k.Dark,children:e,dataTestId:i},o)=>(0,a.jsx)(a.Fragment,{children:r?(0,a.jsx)(f,{"data-testid":i??"backdrop",ref:o,type:t,children:e}):null}));export{k as n,j as t};
