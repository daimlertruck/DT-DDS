var P=Object.defineProperty;var i=(e,o)=>P(e,"name",{value:o,configurable:!0});import{o as W}from"./rolldown-runtime-CzYk_CEw.js";import{t as B}from"./react-HNhQAnN4.js";import{n as x,o as I,t as p,u as q}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as K}from"./src-Cgsrikn0.js";import{t as M}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";var c=W(B());I();var N={small:20,large:24},z={small:16,large:20},A=i(e=>({disabled:{active:{bg:e.palette.informative.light,border:"transparent"},inactive:{bg:e.palette.informative.light,border:e.palette.informative.medium}},default:{active:{normal:{bg:e.palette.informative.default,border:"transparent",hover:e.palette.informative.dark},error:{bg:e.palette.error.default,border:"transparent",hover:e.palette.error.dark}},inactive:{normal:{bg:e.palette.surface.contrast,border:e.palette.informative.default,hover:e.palette.informative.light},error:{bg:e.palette.surface.contrast,border:e.palette.error.default,hover:e.palette.error.light}}}}),"getCheckboxColors"),G=i((e,o,r,a,n)=>{const s=A(e),t=o||r?"active":"inactive";if(a)return s.disabled[t];const l=n?"error":"normal";return s.default[t][l]},"getCheckboxState"),T=p("label",{shouldForwardProp:i(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  display: inline-flex;
  align-items: center;
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  position: relative;
`,V=p.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`,Z=p("div",{shouldForwardProp:i(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.shape.checkbox};
  flex-shrink: 0;

  ${({theme:e,$checked:o,$indeterminate:r,$disabled:a,$error:n,$size:s})=>{const t=G(e,o,r,a,n),l=N[s];return`
      height: ${l}px;
      width: ${l}px;

      background-color: ${t.bg};
      border: 1px solid ${t.border};

      ${!a&&"hover"in t?`
            label:hover & {
              background-color: ${t.hover};
            }
          `:""}
    `}}

  input:focus-visible + & {
    outline: 2px solid ${({theme:e})=>e.palette.primary.default};
    outline-offset: 2px;
  }
`,J=p("div",{shouldForwardProp:i(e=>x(e)&&!e.startsWith("$"),"shouldForwardProp")})`
  user-select: none;
  display: flex;
  align-items: center;

  ${({theme:e,$disabled:o,$size:r})=>`
    padding-left: ${e.spacing.spacing_30};
    ${r==="small"?e.fontStyles.bodyMdRegular:e.fontStyles.bodyLgRegular};
    color: ${o?e.palette.content.light:e.palette.content.default};
  `}
`;function O(...e){return o=>{for(const r of e)r&&(typeof r=="function"?r(o):r&&(r.current=o))}}i(O,"mergeRefs");var d=M(),Q=(0,c.forwardRef)(({dataTestId:e="checkbox",onChange:o,isChecked:r=!1,isDisabled:a=!1,isIndeterminate:n=!1,hasError:s=!1,size:t="large",label:l,children:b,style:$,id:y,"aria-label":k,..._},C)=>{const S=q(),v=(0,c.useRef)(null),R=O(v,C),f=(0,c.useRef)(null);(0,c.useEffect)(()=>{v.current&&(v.current.indeterminate=n)},[n]),(0,c.useLayoutEffect)(()=>{if(!f.current)return;const u=f.current.closest("label");if(!u)return;const E=f.current,F=z[t]+1,H=E.offsetHeight>F;u.style.alignItems=H?"flex-start":"center"},[l,b,t]);const j=i(u=>{a||o?.(u)},"handleChange"),w=i(()=>n?"remove":r?"check":null,"getIconCode"),g=!!(l||b),m=y||(g?e:void 0),h=w(),L=t==="small"?"medium":"large";return(0,d.jsxs)(T,{$disabled:a,"data-testid":e,htmlFor:m,style:$,children:[(0,d.jsx)(V,{"aria-checked":n?"mixed":void 0,"aria-invalid":s,"aria-label":g?void 0:k||"Checkbox",checked:r,disabled:a,id:m,onChange:j,ref:R,type:"checkbox",..._}),(0,d.jsx)(Z,{$checked:r,$disabled:a,$error:s,$indeterminate:n,$size:t,"data-testid":"checkbox-box",children:h?(0,d.jsx)(K,{code:h,color:S.palette.content.contrast,size:L}):null}),g?(0,d.jsx)(J,{$disabled:a,$size:t,ref:f,children:l||b}):null]})});Q.displayName="Checkbox";export{Q as t};
