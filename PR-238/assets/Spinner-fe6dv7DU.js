var u=Object.defineProperty;var t=(r,e)=>u(r,"name",{value:e,configurable:!0});import{o as p,s as x,t as g,u as b}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as v}from"./jsx-runtime-Br4tQxt1.js";import{t as y}from"./Typography-BVFm109i.js";import{t as f}from"./src-1jRqCCWR.js";import"./box-DLdZVqFP.js";import"./typography-D38L8NZ6.js";p();var _=x`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`,s={"extra-small":"14px",small:"28px",medium:"42px",large:"50px","extra-large":"58px"},l={"extra-small":"2px",small:"4px",medium:"4px",large:"4px","extra-large":"4px"},m=t(r=>({positive:{main:r.palette.primary.default,background:r.palette.border.default},negative:{main:r.palette.border.light,background:r.palette.primary.dark}}),"spinnerColors"),c=g.div`
  ${({theme:r,size:e,colorScheme:a})=>`
    width: ${s[e]};
    height: ${s[e]};
    border: ${l[e]} solid ${m(r)[a].background};
    border-radius: 50%;
    border-top: ${l[e]} solid ${m(r)[a].main};
  `};
  animation: ${_} 1s cubic-bezier(0.3, 0.1, 0.25, 0.65) 0s
    infinite normal none;
`;p();var i=v(),$={positive:"content.default",negative:"content.contrast"},S={"extra-small":"bodyXsRegular",small:"bodyXsRegular",medium:"bodySmRegular",large:"bodySmRegular","extra-large":"bodyMdRegular"},X=t(({style:r,dataTestId:e="spinner",size:a="medium",colorScheme:n="positive",loadingText:o})=>{const d=b();return(0,i.jsxs)(f,{dataTestId:e,style:{...r},children:[(0,i.jsx)(c,{colorScheme:n,"data-testid":`${e}-element`,size:a}),o?(0,i.jsx)(y,{color:$[n],fontStyles:S[a],style:{marginTop:d.spacing.spacing_30},children:o}):null]})},"Spinner");export{X as t};
