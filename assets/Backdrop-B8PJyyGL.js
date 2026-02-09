import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{r as s}from"./index-CwbBKW39.js";import{f as p}from"./emotion-styled.browser.esm-CIRWz9XU.js";import"./typography-B3nKKPHm.js";import{h as d}from"./hexToRgba-CWpEuk8w.js";import"./index-T4vgCba5.js";import"./index-DV-VXEUn.js";import{B as n}from"./z-index-C44GOntP.js";const c={dark:.85,light:.2},m=p.div`
  ${({theme:t,type:r})=>`
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${d(t.palette.surface.dark,c[r])};
      z-index: ${n};
    `}
`,f={Dark:"dark",Light:"light"},j=s.forwardRef(({isOpen:t=!1,type:r=f.Dark,children:a,dataTestId:e},i)=>o.jsx(o.Fragment,{children:t?o.jsx(m,{"data-testid":e??"backdrop",ref:i,type:r,children:a}):null}));export{f as B,j as a};
