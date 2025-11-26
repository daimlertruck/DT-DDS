var n=Object.defineProperty;var i=(t,r)=>n(t,"name",{value:r,configurable:!0});import{j as s}from"./jsx-runtime-Cgz2XvFB.js";import{r as c}from"./index-CwbBKW39.js";import{f as d}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./typography-B3nKKPHm.js";import"./index-D2KK6fpr.js";import"./index-DV-VXEUn.js";import{B as m}from"./z-index-KGn0H6PT.js";const f=i((t,r=1)=>{const[a,o,e]=(t.match(/\w\w/g)||[]).map(p=>parseInt(p,16));return`rgba(${a},${o},${e},${r})`},"hexToRgba"),l={dark:.85,light:.2},g=d.div`
  ${({theme:t,type:r})=>`
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${f(t.palette.surface.dark,l[r])};
      z-index: ${m};
    `}
`,h={Dark:"dark",Light:"light"},w=c.forwardRef(({isOpen:t=!1,type:r=h.Dark,children:a,dataTestId:o},e)=>s.jsx(s.Fragment,{children:t?s.jsx(g,{"data-testid":o??"backdrop",ref:e,type:r,children:a}):null}));export{h as B,w as a,f as h};
