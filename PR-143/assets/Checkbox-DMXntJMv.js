var I=Object.defineProperty;var f=(e,t)=>I(e,"name",{value:t,configurable:!0});import{j as c}from"./jsx-runtime-Cgz2XvFB.js";import{r as g}from"./index-CwbBKW39.js";import{I as _}from"./Icon-BrO18bYS.js";import{f as u,d as B}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const s={small:20,large:24},z=179,A=f(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),H=u.label`
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
`,M=u.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,X=u.div`
  height: ${({$size:e})=>s[e]}px;
  min-height: ${({$size:e})=>s[e]}px;
  width: ${({$size:e})=>s[e]}px;
  min-width: ${({$size:e})=>s[e]}px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};

  ${({theme:e,$checked:t,$indeterminate:o,$disabled:l,$error:i})=>{const r=A(e),n=t||o,a=l?r.disabled[n?"active":"inactive"]:r.default[n?"active":"inactive"][i?"error":"normal"];return`
      background-color: ${a.bg};
      border: 1px solid ${a.border};

      ${!l&&"hover"in a?`
            label:hover & {
              background-color: ${a.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,D=u.span`
  user-select: none;
  max-width: ${z}px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-top: calc((${({$size:e})=>s[e]}px - 1.25em) / 2);

  ${({theme:e,$disabled:t,$size:o})=>`
    padding-left: ${e.spacing.spacing_30};
    ${o==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${t?e.palette.content.light:e.palette.content.default};
  `}

  [dir='rtl'] & {
    padding-left: 0;
    padding-right: ${({theme:e})=>e.spacing.spacing_30};
  }
`;function F(...e){return t=>{for(const o of e)o&&(typeof o=="function"?o(t):o&&(o.current=t))}}f(F,"mergeRefs");const q=g.forwardRef(({dataTestId:e="checkbox",onChange:t,checked:o,defaultChecked:l,disabled:i=!1,indeterminate:r=!1,error:n=!1,size:a="large",label:x,children:$,style:m,id:k,"aria-label":y,...w},C)=>{const S=B(),b=g.useRef(null),j=F(b,C);g.useEffect(()=>{b.current&&(b.current.indeterminate=r)},[r]);const R=f(L=>{i||t==null||t(L)},"handleChange"),d=!!(x||$),v=k||(d?`checkbox-${e}`:void 0),p=o??l??!1,h=r?"remove":p?"check":null,E=a==="small"?"medium":"large";return c.jsxs(H,{$checked:p,$disabled:i,$error:n,$hasLabel:d,$indeterminate:r,$size:a,"data-testid":e,htmlFor:v,style:m,children:[c.jsx(M,{"aria-checked":r?"mixed":p,"aria-invalid":n,"aria-label":d?void 0:y||"Checkbox",checked:o,defaultChecked:l,disabled:i,id:v,onChange:R,ref:j,type:"checkbox",...w}),c.jsx(X,{$checked:p,$disabled:i,$error:n,$indeterminate:r,$size:a,children:h?c.jsx(_,{code:h,color:S.palette.content.contrast,size:E}):null}),d?c.jsx(D,{$disabled:i,$size:a,children:x||$}):null]})});export{q as C};
