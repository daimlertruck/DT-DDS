var P=Object.defineProperty;var n=(e,r)=>P(e,"name",{value:r,configurable:!0});import{j as d}from"./jsx-runtime-Cgz2XvFB.js";import{r as v}from"./index-CwbBKW39.js";import{I as E}from"./Icon-BWIy_dZb.js";import{f as p,j as x,d as L}from"./emotion-styled.browser.esm-CIRWz9XU.js";const f={small:20,large:24},W=n(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),B=p("label",{shouldForwardProp:n(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: flex-start;
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

  ${({theme:e,$checked:r,$indeterminate:t,$disabled:o,$error:a,$size:i})=>{const c=W(e),s=r||t,l=o?c.disabled[s?"active":"inactive"]:c.default[s?"active":"inactive"][a?"error":"normal"];return`
      height: ${f[i]}px;
      min-height: ${f[i]}px;
      width: ${f[i]}px;
      min-width: ${f[i]}px;

      background-color: ${l.bg};
      border: 1px solid ${l.border};

      ${!o&&"hover"in l?`
            label:hover & {
              background-color: ${l.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,V=p("div",{shouldForwardProp:n(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  user-select: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${({theme:e,$disabled:r,$size:t})=>`
    padding-left: ${e.spacing.spacing_30};
    ${t==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${r?e.palette.content.light:e.palette.content.default};
  `}
`;function Z(...e){return r=>{for(const t of e)t&&(typeof t=="function"?t(r):t&&(t.current=r))}}n(Z,"mergeRefs");const _=v.forwardRef(({dataTestId:e="checkbox",onChange:r,isChecked:t=!1,isDisabled:o=!1,isIndeterminate:a=!1,hasError:i=!1,size:c="large",label:s,children:l,style:m,id:$,"aria-label":k,...y},w)=>{const j=L(),u=v.useRef(null),S=Z(u,w);v.useEffect(()=>{u.current&&(u.current.indeterminate=a)},[a]);const R=n(F=>{o||r==null||r(F)},"handleChange"),b=!!(s||l),g=$||(b?e:void 0),h=a?"remove":t?"check":null,C=c==="small"?"medium":"large";return d.jsxs(B,{$disabled:o,"data-testid":e,htmlFor:g,style:m,children:[d.jsx(M,{"aria-checked":a?"mixed":void 0,"aria-invalid":i,"aria-label":b?void 0:k||"Checkbox",checked:t,disabled:o,id:g,onChange:R,ref:S,type:"checkbox",...y}),d.jsx(N,{$checked:t,$disabled:o,$error:i,$indeterminate:a,$size:c,children:h?d.jsx(E,{code:h,color:j.palette.content.contrast,size:C}):null}),b?d.jsx(V,{$disabled:o,$size:c,children:s||l}):null]})});_.displayName="Checkbox";export{_ as C};
