var d=Object.defineProperty;var a=(r,e)=>d(r,"name",{value:e,configurable:!0});import{j as n}from"./jsx-runtime-Cgz2XvFB.js";import{B as x}from"./index-DTgA8jos.js";import{T as g}from"./Typography-Dk4smw7A.js";import{k as u}from"./emotion-react.browser.esm-BzOLYAw5.js";import{f as c,d as b}from"./emotion-styled.browser.esm-CIRWz9XU.js";const f=u`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`,i={"extra-small":"14px",small:"28px",medium:"42px",large:"50px","extra-large":"58px"},l={"extra-small":"2px",small:"4px",medium:"4px",large:"4px","extra-large":"4px"},p=a(r=>({positive:{main:r.palette.primary.default,background:r.palette.border.default},negative:{main:r.palette.border.light,background:r.palette.primary.dark}}),"spinnerColors"),y=c.div`
  ${({theme:r,size:e,colorScheme:t})=>`
    width: ${i[e]};
    height: ${i[e]};
    border: ${l[e]} solid ${p(r)[t].background};
    border-radius: 50%;
    border-top: ${l[e]} solid ${p(r)[t].main};
  `};
  animation: ${f} 1s cubic-bezier(0.3, 0.1, 0.25, 0.65) 0s
    infinite normal none;
`,$={positive:"content.default",negative:"content.contrast"},S={"extra-small":"bodyXsRegular",small:"bodyXsRegular",medium:"bodySmRegular",large:"bodySmRegular","extra-large":"bodyMdRegular"},B=a(({style:r,dataTestId:e="spinner",size:t="medium",colorScheme:o="positive",loadingText:s})=>{const m=b();return n.jsxs(x,{dataTestId:e,style:{...r},children:[n.jsx(y,{colorScheme:o,"data-testid":`${e}-element`,size:t}),s?n.jsx(g,{color:$[o],fontStyles:S[t],style:{marginTop:m.spacing.spacing_30},children:s}):null]})},"Spinner");export{B as S};
