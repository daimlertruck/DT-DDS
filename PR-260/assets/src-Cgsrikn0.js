var l=Object.defineProperty;var i=(e,t)=>l(e,"name",{value:t,configurable:!0});import{o as m,t as p,u as f}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as c}from"./jsx-runtime-Br4tQxt1.js";m();var d={"extra-small":"12px",small:"16px",medium:"20px",large:"24px","extra-large":"32px"},x=p.i`
  ${({size:e,theme:t,variant:o,color:r})=>`
    font-family: DTUI-icons-${t.icons};
    font-weight: normal;
    font-style: normal;
    font-size: ${d[e]};
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    font-variation-settings: 'FILL' ${o==="filled"?1:0};
    color: ${r};

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
  
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
  
    /* Support for IE. */
    font-feature-settings: 'liga';
  `}
`,g=c(),u=i(({code:e,color:t,dataTestId:o,size:r="large",style:n,variant:a="outlined"})=>{const s=f();return(0,g.jsx)(x,{color:t??s.palette.content.default,"data-testid":o??"icon",size:r,style:n,variant:a,children:e})},"Icon");u.displayName="Icon";export{d as n,u as t};
