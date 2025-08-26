import{j as o}from"./jsx-runtime-DMAvRu52.js";import{T as m}from"./Typography-DII2gFDQ.js";import{n as v,d as M}from"./emotion-styled.browser.esm-Dv69Fly8.js";import{r as l}from"./index-Dl6G-zuu.js";import{B as P}from"./index-DSuwS0lG.js";import{I as O}from"./Icon-87Ryblgq.js";import{I as T}from"./IconButton-8pEMAeo8.js";import"./index-CL4Xg4Pf.js";import"./index-BSh7GFw5.js";import"./index-DCrStp1_.js";import{a as z}from"./z-index-Ds5QkyqS.js";import{u as A}from"./useClickOutside-CBJSS0tk.js";const F=v.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  margin-top: 4px;
`,N=({dataTestId:t,isDisabled:e=!1,hasError:n=!1,children:r=""})=>{const s=e?"content.light":"content.medium";return o.jsx(F,{"data-testid":t??"dropdown-text",children:o.jsx(m,{color:n?"error.default":s,element:"span",fontStyles:"body3",children:r})})},h={state:{text:"",value:""},isOpen:!1,setState:()=>null,setIsOpen:()=>null},k=l.createContext(h),R=({children:t,defaultValue:e,name:n})=>{const[r,s]=l.useState(e??h.state),[i,c]=l.useState(h.isOpen);return l.useEffect(()=>e&&s(e),[e]),o.jsx(k.Provider,{value:{state:r,setState:s,isOpen:i,setIsOpen:c,name:n},children:t})},C=()=>{const t=l.useContext(k);if(!t)throw new Error("Dropdown compound components cannot be rendered outside the Dropdown component");return t},U=v.li`
  ${({theme:t,disabled:e,isSelected:n})=>`
    ${t.fontStyles[n?"body2Bold":"body2"]};
    color: ${t.palette.content.default};
    list-style: none;
    padding: ${t.spacing["4xs"]} ${t.spacing["2xs"]};
    text-overflow: ellipsis;
    overflow-x: hidden;

    &:hover {
      background: ${e?t.palette.surface.light:t.palette.primary.light};
      cursor: ${e?"not-allowed":"pointer"};
    }

    ${e&&`
        color: ${t.palette.content.light};
        background: ${t.palette.surface.light};
      `}
  `}
`,L=({dataTestId:t,option:e,children:n,style:r,isDisabled:s,onClick:i})=>{const{state:c,setState:f,setIsOpen:x,name:y}=C(),b=t??`dropdown-option-${e.value}`,p={text:e.text??e.value,value:e.value},u=g=>{s||(x(!1),f(p),i&&i(e.value,y,g))};return o.jsx(U,{"data-testid":b,disabled:s,isSelected:c.value===e.value,onClick:u,role:"option",style:r,children:n},e.value)},W=v.ul`
  ${({theme:t})=>`
    background: ${t.palette.surface.contrast};
    border: 1px solid ${t.palette.border.default};
    border-radius: ${t.shape.dropdown};
    width: 100%;
    padding:${t.spacing["2xs"]} ${t.spacing.none};
    margin: ${t.spacing["5xs"]} ${t.spacing.none};
    position: absolute;
    right: 0;
    z-index: ${z};
    max-height: 180px;
    overflow: auto;
  `}
`,I=({children:t,dataTestId:e,style:n})=>o.jsx(W,{"data-testid":`${e?e+"-":""}menu`,style:n,children:t}),X=(t,e)=>({default:e.palette.surface.default,contrast:e.palette.surface.contrast,light:e.palette.surface.light})[t],Z=v.button`
  ${({theme:t,hasBorder:e=!0,hasError:n=!1,isOpen:r=!1,variant:s="outlined",fill:i="default"})=>{const c=t.palette.border.medium,f=t.palette.content.dark,x=t.palette.error.default;return`
      background: ${t.palette.surface.contrast};
      padding: ${t.spacing.xsmall} ${e?t.spacing.xmedium:"0"};
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      width: 100%;
      height: 53px;
      cursor: pointer;
      outline: none;

      background-color: ${X(i,t)};

      border-width: ${s==="outlined"?"1px":"0 0 1px"};
      border-color: ${r?f:c};
      border-style: solid;

      &:focus, &:hover {
        border-color: ${n?x:f};
      }

      ${n&&`border-color: ${x}`};
      ${!e&&"border: none"};

      &:disabled {
        pointer-events: none;
      }
    `}}
`,q=({children:t,label:e,style:n,dataTestId:r="dropdown-select",isDisabled:s=!1,isRequired:i,hasBorder:c=!0,hasError:f=!1,hasDeselect:x=!1,variant:y="outlined",fill:b="default"})=>{const{state:p,setState:u,isOpen:g,setIsOpen:E}=C(),j=M(),D=l.Children.count(t)===1,$=s||D,S=$?j.palette.content.light:j.palette.content.default,B=a=>{a.preventDefault(),E(d=>!d)},_=a=>{a.stopPropagation(),u({text:"",value:""})};return l.useEffect(()=>{l.Children.toArray(t).find(d=>d.props.option.value===p.value)||u({text:"",value:""})},[t,u,p.value]),l.useEffect(()=>{if(D){const a=l.Children.map(t,d=>d&&d.props.option);if(a&&a[0]){const d={text:a[0].text??a[0].value,value:a[0].value};u(d)}}},[D,u,t]),o.jsxs(o.Fragment,{children:[o.jsxs(Z,{"data-testid":r,disabled:$,fill:b,hasBorder:c,hasError:f,isOpen:g,onClick:B,style:n,variant:y,children:[o.jsxs("div",{style:{overflow:"hidden"},children:[o.jsxs(m,{color:$?"content.light":"content.default",fontStyles:"body3",children:[e,i?o.jsx(m,{color:"error.default",element:"span",fontStyles:"body3",children:"*"}):null]}),o.jsx(m,{color:$?"content.light":"content.default",fontStyles:"body2",style:{textOverflow:"ellipsis",overflow:"hidden"},children:p.value?p.text:"Select an option"})]}),o.jsxs(P,{style:{flexDirection:"row",gap:"0.5rem"},children:[x&&p.value?o.jsx(T,{onClick:_,children:o.jsx(O,{code:"close",color:S,dataTestId:"deselect-value",size:"s"})}):null,o.jsx(O,{code:g?"expand_less":"expand_more",color:S,size:"l"})]})]}),g?o.jsx(I,{dataTestId:r,children:t}):null]})},G=({children:t,style:e,dataTestId:n})=>{const{setIsOpen:r}=C(),s=l.useRef(null);return A({ref:s,handler:()=>r(!1)}),o.jsx("div",{"data-testid":n,ref:s,style:e,children:t})},H=v.div`
  ${({theme:t,style:e})=>`
    margin: ${t.spacing.none};
    display: inline-block;
    position: relative;
    width: 100%;
    ${e}
  `}
`,w=({children:t,defaultValue:e,style:n,name:r,dataTestId:s="dropdown"})=>o.jsx(R,{defaultValue:e,name:r,children:o.jsx(H,{"data-testid":s,role:"menu",style:n,children:t})});w.Container=G;w.Detail=N;w.Select=q;w.Option=L;w.Menu=I;export{w as D};
