var A=Object.defineProperty;var s=(e,r)=>A(e,"name",{value:r,configurable:!0});import{n as h}from"./rolldown-runtime-CzYk_CEw.js";import{t as G}from"./react-HNhQAnN4.js";import{c as Z,f as J,i as x,n as u,r as O,t as Q}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{n as U}from"./src-BrR2wA0B.js";import{t as X}from"./jsx-runtime-Br4tQxt1.js";import{t as Y}from"./icon-CY5qnilU.js";var S,P;function D(){return(D=h((()=>{S={small:20,large:24},P={small:16,large:20}})))()}s(D,"init_constants");var _,C,T,N,$,q;function V(){return(V=h((()=>{O(),Q(),D(),_=s(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),C=s((e,r,a,n,o)=>{const i=_(e),t=r||a?"active":"inactive";if(n)return i.disabled[t];const c=o?"error":"normal";return i.default[t][c]},"getCheckboxState"),T=u("label",{shouldForwardProp:s(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: center;
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;
`,N=u.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,$=u("div",{shouldForwardProp:s(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};
  flex-shrink: 0;

  ${({theme:e,$checked:r,$indeterminate:a,$disabled:n,$error:o,$size:i})=>{const t=C(e,r,a,n,o),c=S[i];return`
      height: ${c}px;
      width: ${c}px;

      background-color: ${t.bg};
      border: 1px solid ${t.border};

      ${!n&&"hover"in t?`
            label:hover & {
              background-color: ${t.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,q=u("div",{shouldForwardProp:s(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  user-select: none;
  display: flex;
  align-items: center;

  ${({theme:e,$disabled:r,$size:a})=>`
    padding-left: ${e.spacing.spacing_30};
    ${a==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${r?e.palette.content.light:e.palette.content.default};
  `}
`})))()}s(V,"init_Checkbox_styled");function ee(...e){return r=>{for(const a of e)a&&(typeof a=="function"?a(r):a&&(a.current=r))}}s(ee,"mergeRefs");var l,p,m;function ae(){return(ae=h((()=>{l=G(),Z(),Y(),V(),D(),p=X(),m=(0,l.forwardRef)(({dataTestId:e="checkbox",onChange:r,isChecked:a=!1,isDisabled:n=!1,isIndeterminate:o=!1,hasError:i=!1,size:t="large",label:c,children:g,style:R,id:w,"aria-label":I,...B},E)=>{const L=J(),k=(0,l.useRef)(null),j=ee(k,E),d=(0,l.useRef)(null);(0,l.useEffect)(()=>{k.current&&(k.current.indeterminate=o)},[o]),(0,l.useLayoutEffect)(()=>{if(!d.current)return;const f=d.current.closest("label");if(!f)return;const W=d.current,M=P[t]+1,K=W.offsetHeight>M;f.style.alignItems=K?"flex-start":"center"},[c,g,t]);const H=s(f=>{n||r?.(f)},"handleChange"),z=s(()=>o?"remove":a?"check":null,"getIconCode"),b=!!(c||g),y=w||(b?e:void 0),v=z(),F=t==="small"?"medium":"large";return(0,p.jsxs)(T,{$disabled:n,"data-testid":e,htmlFor:y,style:R,children:[(0,p.jsx)(N,{"aria-checked":o?"mixed":void 0,"aria-invalid":i,"aria-label":b?void 0:I||"Checkbox",checked:a,disabled:n,id:y,onChange:H,ref:j,type:"checkbox",...B}),(0,p.jsx)($,{$checked:a,$disabled:n,$error:i,$indeterminate:o,$size:t,"data-testid":"checkbox-box",children:v?(0,p.jsx)(U,{code:v,color:L.palette.content.contrast,size:F}):null}),b?(0,p.jsx)(q,{$disabled:n,$size:t,ref:d,children:c||g}):null]})}),m.displayName="Checkbox";try{m.displayName="Checkbox",m.__docgenInfo={description:"",displayName:"Checkbox",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/checkbox/src/Checkbox.tsx",methods:[],props:{size:{defaultValue:{value:"large"},declarations:[{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"}],description:"",name:"size",parent:{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"},required:!1,tags:{},type:{name:"CheckboxSize | undefined"}},dataTestId:{defaultValue:{value:"checkbox"},declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"dataTestId",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},style:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"style",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"CSSProperties | undefined"}},label:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"}],description:"",name:"label",parent:{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"},required:!1,tags:{},type:{name:"ReactNode"}},id:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"}],description:"",name:"id",parent:{fileName:"DT-DDS/packages/react-packages/core/src/types/baseProps.ts",name:"BaseProps"},required:!1,tags:{},type:{name:"string | undefined"}},"aria-label":{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"}],description:"Defines a string value that labels the current element.",name:"aria-label",parent:{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"},required:!1,tags:{},type:{name:"string | undefined"}},onChange:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"}],description:"",name:"onChange",parent:{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"},required:!1,tags:{},type:{name:"((event: ChangeEvent<HTMLInputElement>) => void) | undefined"}},isDisabled:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"}],description:"",name:"isDisabled",parent:{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},hasError:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"}],description:"",name:"hasError",parent:{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},isChecked:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"}],description:"",name:"isChecked",parent:{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"},required:!1,tags:{},type:{name:"boolean | undefined"}},isIndeterminate:{defaultValue:{value:"false"},declarations:[{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"}],description:"",name:"isIndeterminate",parent:{fileName:"DT-DDS/packages/react-packages/checkbox/src/types/index.ts",name:"CheckboxProps"},required:!1,tags:{},type:{name:"boolean | undefined"}}},tags:{}}}catch{}})))()}s(ae,"init_Checkbox");export{ae as n,m as t};
