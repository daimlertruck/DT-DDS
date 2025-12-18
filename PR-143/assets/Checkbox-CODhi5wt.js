var B=Object.defineProperty;var c=(e,t)=>B(e,"name",{value:t,configurable:!0});import{j as d}from"./jsx-runtime-Cgz2XvFB.js";import{r as x}from"./index-CwbBKW39.js";import{I as E}from"./Icon-BWIy_dZb.js";import{f as u,j as v,d as F}from"./emotion-styled.browser.esm-CIRWz9XU.js";const p={small:20,large:24},P=179,W=c(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),_=u("label",{shouldForwardProp:c(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: flex-start;
  width: ${({$hasLabel:e})=>e?"100%":"auto"};
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;

  ${({theme:e,$disabled:t})=>!t&&`
      &:hover span {
        color: ${e.palette.content.light};
      }
    `}
`,A=u.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,H=u("div",{shouldForwardProp:c(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};

  ${({theme:e,$checked:t,$indeterminate:o,$disabled:r,$error:a,$size:l})=>{const i=W(e),s=t||o,n=r?i.disabled[s?"active":"inactive"]:i.default[s?"active":"inactive"][a?"error":"normal"];return`
      height: ${p[l]}px;
      min-height: ${p[l]}px;
      width: ${p[l]}px;
      min-width: ${p[l]}px;

      background-color: ${n.bg};
      border: 1px solid ${n.border};

      ${!r&&"hover"in n?`
            label:hover & {
              background-color: ${n.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,M=u("span",{shouldForwardProp:c(e=>v(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  user-select: none;
  max-width: ${P}px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-top: calc((${({$size:e})=>p[e]}px - 1.25em) / 2);

  ${({theme:e,$disabled:t,$size:o})=>`
    padding-left: ${e.spacing.spacing_30};
    ${o==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${t?e.palette.content.light:e.palette.content.default};
  `}
`;function X(...e){return t=>{for(const o of e)o&&(typeof o=="function"?o(t):o&&(o.current=t))}}c(X,"mergeRefs");const K=x.forwardRef(({dataTestId:e="checkbox",onChange:t,isChecked:o=!1,isDisabled:r=!1,isIndeterminate:a=!1,hasError:l=!1,size:i="large",label:s,children:n,style:g,id:m,"aria-label":k,...y},w)=>{const j=F(),b=x.useRef(null),S=X(b,w);x.useEffect(()=>{b.current&&(b.current.indeterminate=a)},[a]);const C=c(L=>{r||t==null||t(L)},"handleChange"),f=!!(s||n),$=m||(f?`checkbox-${e}`:void 0),h=a?"remove":o?"check":null,R=i==="small"?"medium":"large";return d.jsxs(_,{$checked:o,$disabled:r,$error:l,$hasLabel:f,$indeterminate:a,$size:i,"data-testid":e,htmlFor:$,style:g,children:[d.jsx(A,{"aria-checked":a?"mixed":void 0,"aria-invalid":l,"aria-label":f?void 0:k||"Checkbox",checked:o,disabled:r,id:$,onChange:C,ref:S,type:"checkbox",...y}),d.jsx(H,{$checked:o,$disabled:r,$error:l,$indeterminate:a,$size:i,children:h?d.jsx(E,{code:h,color:j.palette.content.contrast,size:R}):null}),f?d.jsx(M,{$disabled:r,$size:i,children:s||n}):null]})});K.displayName="Checkbox";export{K as C};
