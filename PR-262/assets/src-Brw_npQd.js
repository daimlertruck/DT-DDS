var x=Object.defineProperty;var s=(r,e)=>x(r,"name",{value:e,configurable:!0});import{l as _}from"./preload-helper-DhB_op97.js";import{t as v}from"./react-Cv64OdzP.js";import{o as b,t as h,u as f}from"./emotion-styled.browser.esm-YTZgSpOx.js";import{t as y}from"./jsx-runtime-CPdzY0Ku.js";import{t as w}from"./Typography-CS3NCxJQ.js";import{t as $}from"./src-D8J0l-L9.js";import"./box-urSjHwr1.js";import"./typography-D_Go94-A.js";var u=_(v());b();var d={large:{outerCircle:24,innerCircle:10},small:{outerCircle:20,innerCircle:8}},C=h.input`
  ${({theme:r,radioSize:e})=>`
    background: ${r.palette.surface.contrast};
    border: 1px solid ${r.palette.informative.default};
    border-radius: 50%;
    width: ${d[e].outerCircle}px;
    height: ${d[e].outerCircle}px;
    appearance: none;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;

    &:disabled + label {
      color: ${r.palette.content.light};
    }

    &:hover {
      background: ${r.palette.informative.light};
    }

    &:checked:not(:disabled):hover {
      background: ${r.palette.informative.dark};
      border-color: ${r.palette.informative.dark};
    }

    &:checked {
      background: ${r.palette.informative.default};
    }

    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
      border-color: ${r.palette.informative.light};
      background-color: ${r.palette.informative.light};
    }

    &:checked:before {
      content: "";
      width: ${d[e].innerCircle}px;
      height: ${d[e].innerCircle}px;
      background: ${r.palette.surface.contrast};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &[data-error="true"] {
      border-color: ${r.palette.error.default};
    }

    &[data-error="true"]:hover {
      background-color: ${r.palette.error.light};
    }

    &[data-error="true"]:disabled {
      background-color: ${r.palette.error.light};
      border-color: ${r.palette.error.light};
    }

    &[data-error="true"]:checked {
      background-color: ${r.palette.error.default};
    }

    &[data-error="true"]:checked:disabled {
      background-color: ${r.palette.error.light};
      border-color: ${r.palette.error.light};
    }
    
    &[data-error="true"]:checked:not(:disabled):hover {
      background-color: ${r.palette.error.dark};
      border-color: ${r.palette.error.dark};
    }

    &:focus-visible {
      outline: 2px solid ${r.palette.primary.default};
      outline-offset: 2px;
    }
  `}
`,n=y(),F=s(({onChange:r,label:e,isChecked:c,isDefaultChecked:a,isDisabled:o,name:l="radio-group-name",value:i,hasError:p,size:t="large",dataTestId:k})=>{const g=`${i}-id`,m=f();return(0,n.jsxs)($,{style:{flexDirection:"row",gap:m.spacing.spacing_30,cursor:o?"not-allowed":"pointer"},children:[(0,n.jsx)(C,{checked:c,"data-error":p,"data-testid":k,defaultChecked:a,disabled:o,id:g,name:l,onChange:r,radioSize:t,tabIndex:o?-1:0,type:"radio",value:i}),e?(0,n.jsx)(w,{element:"label",fontStyles:t==="large"?"bodyLgRegular":"bodyMdRegular",htmlFor:g,style:{cursor:o?"not-allowed":"pointer"},children:e}):null]})},"Radio");b();var G=s(({children:r,onChange:e,dataTestId:c,direction:a="row",size:o="large",name:l})=>{const i=f(),p=(0,u.useMemo)(()=>u.Children.map(r,t=>t&&(0,u.cloneElement)(t,{...t.props,onChange:e,name:l,size:o})),[r,e,l,o]);return(0,n.jsx)($,{"data-testid":c??"radio-group",role:"radiogroup",style:{flexDirection:a,gap:i.spacing.spacing_40,alignItems:a==="row"?"center":"flex-start"},children:p})},"RadioGroup");export{F as n,G as t};
