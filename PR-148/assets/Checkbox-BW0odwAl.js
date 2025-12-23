var P=Object.defineProperty;var n=(e,r)=>P(e,"name",{value:r,configurable:!0});import{j as d}from"./jsx-runtime-Cgz2XvFB.js";import{r as v}from"./index-CwbBKW39.js";import{I as E}from"./Icon-BWIy_dZb.js";import{f as p,j as x,d as L}from"./emotion-styled.browser.esm-CIRWz9XU.js";const f={small:20,large:24},W=n(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),B=p("label",{shouldForwardProp:n(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: center;
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;
`,M=p.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,N=p("div",{shouldForwardProp:n(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};

  ${({theme:e,$checked:r,$indeterminate:t,$disabled:o,$error:a,$size:l})=>{const c=W(e),s=r||t,i=o?c.disabled[s?"active":"inactive"]:c.default[s?"active":"inactive"][a?"error":"normal"];return`
      height: ${f[l]}px;
      min-height: ${f[l]}px;
      width: ${f[l]}px;
      min-width: ${f[l]}px;

      background-color: ${i.bg};
      border: 1px solid ${i.border};

      ${!o&&"hover"in i?`
            label:hover & {
              background-color: ${i.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,V=p("div",{shouldForwardProp:n(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  user-select: none;
  display: flex;
  align-items: center;

  ${({theme:e,$disabled:r,$size:t})=>`
    padding-left: ${e.spacing.spacing_30};
    ${t==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${r?e.palette.content.light:e.palette.content.default};
  `}
`;function Z(...e){return r=>{for(const t of e)t&&(typeof t=="function"?t(r):t&&(t.current=r))}}n(Z,"mergeRefs");const _=v.forwardRef(({dataTestId:e="checkbox",onChange:r,isChecked:t=!1,isDisabled:o=!1,isIndeterminate:a=!1,hasError:l=!1,size:c="large",label:s,children:i,style:m,id:$,"aria-label":k,...y},j)=>{const S=L(),u=v.useRef(null),R=Z(u,j);v.useEffect(()=>{u.current&&(u.current.indeterminate=a)},[a]);const w=n(F=>{o||r==null||r(F)},"handleChange"),b=!!(s||i),g=$||(b?e:void 0),h=a?"remove":t?"check":null,C=c==="small"?"medium":"large";return d.jsxs(B,{$disabled:o,"data-testid":e,htmlFor:g,style:m,children:[d.jsx(M,{"aria-checked":a?"mixed":void 0,"aria-invalid":l,"aria-label":b?void 0:k||"Checkbox",checked:t,disabled:o,id:g,onChange:w,ref:R,type:"checkbox",...y}),d.jsx(N,{$checked:t,$disabled:o,$error:l,$indeterminate:a,$size:c,"data-testid":"checkbox-box",children:h?d.jsx(E,{code:h,color:S.palette.content.contrast,size:C}):null}),b?d.jsx(V,{$disabled:o,$size:c,children:s||i}):null]})});_.displayName="Checkbox";export{_ as C};
