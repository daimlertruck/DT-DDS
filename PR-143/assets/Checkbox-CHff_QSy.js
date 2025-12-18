var E=Object.defineProperty;var f=(e,t)=>E(e,"name",{value:t,configurable:!0});import{j as s}from"./jsx-runtime-Cgz2XvFB.js";import{r as x}from"./index-CwbBKW39.js";import{I as _}from"./Icon-BrO18bYS.js";import{f as u,d as A}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const d={small:20,large:24},H=179,M=f(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),X=u.label`
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
`,F=u.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,K=u.div`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};

  ${({theme:e,$checked:t,$indeterminate:o,$disabled:r,$error:a,$size:n})=>{const c=M(e),l=t||o,i=r?c.disabled[l?"active":"inactive"]:c.default[l?"active":"inactive"][a?"error":"normal"];return`
      height: ${d[n]}px;
      min-height: ${d[n]}px;
      width: ${d[n]}px;
      min-width: ${d[n]}px;

      background-color: ${i.bg};
      border: 1px solid ${i.border};

      ${!r&&"hover"in i?`
            label:hover & {
              background-color: ${i.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,N=u.span`
  user-select: none;
  max-width: ${H}px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-top: calc((${({$size:e})=>d[e]}px - 1.25em) / 2);

  ${({theme:e,$disabled:t,$size:o})=>`
    padding-left: ${e.spacing.spacing_30};
    ${o==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${t?e.palette.content.light:e.palette.content.default};
  `}
`;function O(...e){return t=>{for(const o of e)o&&(typeof o=="function"?o(t):o&&(o.current=t))}}f(O,"mergeRefs");const T=x.forwardRef(({dataTestId:e="checkbox",onChange:t,isChecked:o,isDisabled:r=!1,isIndeterminate:a=!1,isDefaultChecked:n,hasError:c=!1,size:l="large",label:i,children:v,style:m,id:k,"aria-label":y,...w},C)=>{const S=A(),b=x.useRef(null),j=O(b,C);x.useEffect(()=>{b.current&&(b.current.indeterminate=a)},[a]);const R=f(B=>{r||t==null||t(B)},"handleChange"),p=!!(i||v),g=k||(p?`checkbox-${e}`:void 0),$=o??n??!1,h=a?"remove":o?"check":null,L=l==="small"?"medium":"large";return s.jsxs(X,{$checked:$,$disabled:r,$error:c,$hasLabel:p,$indeterminate:a,$size:l,"data-testid":e,defaultChecked:n,htmlFor:g,style:m,children:[s.jsx(F,{"aria-checked":a?"mixed":void 0,"aria-invalid":c,"aria-label":p?void 0:y||"Checkbox",checked:o,disabled:r,id:g,onChange:R,ref:j,type:"checkbox",...w}),s.jsx(K,{$checked:$,$disabled:r,$error:c,$indeterminate:a,$size:l,children:h?s.jsx(_,{code:h,color:S.palette.content.contrast,size:L}):null}),p?s.jsx(N,{$disabled:r,$size:l,children:i||v}):null]})});T.displayName="Checkbox";export{T as C};
