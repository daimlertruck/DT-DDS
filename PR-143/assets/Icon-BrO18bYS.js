var l=Object.defineProperty;var r=(t,o)=>l(t,"name",{value:o,configurable:!0});import{j as f}from"./jsx-runtime-Cgz2XvFB.js";import{f as p,d as m}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const c={"extra-small":"12px",small:"16px",medium:"20px",large:"24px","extra-large":"32px"},d=p.i`
  ${({size:t,theme:o,variant:e,color:n})=>`
    font-family: DTUI-icons-${o.icons};
    font-weight: normal;
    font-style: normal;
    font-size: ${c[t]};
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    font-variation-settings: 'FILL' ${e==="filled"?1:0};
    color: ${n};

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
  
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
  
    /* Support for IE. */
    font-feature-settings: 'liga';
  `}
`,h=r(({code:t,color:o,dataTestId:e,size:n="large",style:i,variant:a="outlined"})=>{const s=m();return f.jsx(d,{color:o??s.palette.content.default,"data-testid":e??"icon",size:n,style:i,variant:a,children:t})},"Icon");export{h as I,c as f};
