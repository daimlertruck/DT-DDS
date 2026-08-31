import{o as p}from"./rolldown-runtime-CzYk_CEw.js";import{t as d}from"./react-HNhQAnN4.js";import{t as s}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as m}from"./jsx-runtime-Br4tQxt1.js";import"./src-CIbK0PmT.js";import{t as n}from"./hexToRgba-D41tBJLG.js";import"./core-DtZ76Qs_.js";var c=p(d()),f={dark:.85,light:.2},l=s.div`
  ${({theme:r,type:t})=>`
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${n(r.palette.surface.dark,f[t])};
      z-index: 9;
    `}
`,k={Dark:"dark",Light:"light"},a=m(),j=(0,c.forwardRef)(({isOpen:r=!1,type:t=k.Dark,children:e,dataTestId:i},o)=>(0,a.jsx)(a.Fragment,{children:r?(0,a.jsx)(l,{"data-testid":i??"backdrop",ref:o,type:t,children:e}):null}));export{k as n,j as t};
