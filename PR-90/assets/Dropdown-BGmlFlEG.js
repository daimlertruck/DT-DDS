var z=Object.defineProperty;var c=(t,e)=>z(t,"name",{value:e,configurable:!0});import{j as h}from"./jsx-runtime-Cgz2XvFB.js";import"./typography-B3nKKPHm.js";import"./index-CH6WSYnL.js";import{D as m,P as k}from"./z-index-BB_IPOEl.js";import{r as x}from"./index-CwbBKW39.js";import{u as B}from"./useClickOutside-Cp2kQToC.js";import{f as _}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./index-DV-VXEUn.js";const I=_.li`
  ${({theme:t})=>`
    ${t.fontStyles.bodyMdRegular};
    
    color: ${t.palette.content.default};
    padding: ${t.spacing.spacing_40} ${t.spacing.spacing_50};
    list-style: none;
    text-overflow: ellipsis;
    overflow-x: hidden;
    text-wrap: nowrap;

    &:not([aria-disabled="true"]) {
      &[aria-selected="true"], &[aria-selected="true"] span {
        ${t.fontStyles.bodyMdBold};
      }

      &:hover, &[data-highlighted="true"] {
        background: ${t.palette.accent.light};
        cursor: pointer;
      }
    }

    &[aria-disabled="true"] {
      color: ${t.palette.content.light};
      cursor: not-allowed;

      &[aria-selected="true"] {
        background-color: ${t.palette.surface.light};
      }
    }
  `}
`,N=x.forwardRef(({dataTestId:t,children:e,style:a,isDisabled:i,isSelected:r=!1,isHighlighted:o=!1,onClick:d,...l},v)=>{const p=t??"dropdown-option",u=c(s=>{if(i){s.preventDefault(),s.stopPropagation();return}d==null||d(s)},"handleClick");return h.jsx(I,{...l,"aria-disabled":i,"aria-selected":r,"data-highlighted":o,"data-testid":p,onClick:u,ref:v,style:a,children:e})}),R=_.div`
  list-style-type: none;
  width: 100%;
  overflow: auto;

  ${({theme:t})=>`
    padding: ${t.spacing.spacing_50} ${t.spacing.spacing_0};
    background-color: ${t.palette.surface.contrast};
    border-radius: ${t.shape.dropdown};
    border: 1px solid ${t.palette.border.medium};
  `}
`;function H({placement:t,anchor:e,menuWidth:a,menuHeight:i,offsetX:r,offsetY:o}){switch(t){case"bottom":return{top:e.bottom+o,left:e.left+r};case"top":return{top:e.top-o-i,left:e.left+r};case"right":return{top:e.top+o,left:e.right+r};case"left":return{top:e.top+o,left:e.left-r-a}}}c(H,"basePos");function F(t,e,{offsetX:a=0,offsetY:i=4,matchWidth:r=!0,minViewportPadding:o=8,placement:d="bottom",menuRef:l}={}){const[v,p]=x.useState({visibility:"hidden",position:"fixed"});return x.useLayoutEffect(()=>{if(!e||!(t!=null&&t.current)){p({visibility:"hidden",position:"fixed"});return}const u=t==null?void 0:t.current,s=l==null?void 0:l.current,n=c(()=>{const $=window.innerWidth,g=window.innerHeight,y=u.getBoundingClientRect(),b=s==null?void 0:s.getBoundingClientRect(),O=r?y.width:(b==null?void 0:b.width)??y.width,S=(b==null?void 0:b.height)??0;let{top:M,left:D}=H({placement:d,anchor:y,menuWidth:O,menuHeight:S,offsetX:a,offsetY:i});const j=Math.max(o,$-O-o),L=Math.max(o,g-S-o);D=Math.max(o,Math.min(D,j)),M=Math.max(o,Math.min(M,L)),p({position:"fixed",top:M,left:D,width:r?y.width:void 0,maxWidth:r?y.width:300,boxSizing:"border-box",zIndex:m})},"updatePosition");n();const f=new ResizeObserver(n);f.observe(u),u&&f.observe(u);const w={passive:!0};return window.addEventListener("scroll",n,w),window.addEventListener("resize",n,w),()=>{f.disconnect(),window.removeEventListener("scroll",n,w),window.removeEventListener("resize",n,w)}},[l,t,e,d,a,i,r,o]),{style:v}}c(F,"useFloatingPosition");const P=c((t,e)=>{if(t){if(typeof t=="function"){t(e);return}t.current=e}},"setRef"),Q=Object.assign(x.forwardRef(({children:t,style:e,dataTestId:a="dropdown",isOpen:i=!1,anchorRef:r,matchWidth:o=!0,offsetX:d,offsetY:l,as:v="div",onClose:p,placement:u,...s},n)=>{const f=x.useRef(null),w=x.useCallback(g=>{f.current=g,P(n,g)},[n]),{style:$}=F(r,i,{matchWidth:o,offsetX:d,offsetY:l,placement:u,menuRef:f});return B({refs:[f,r],handler:c(()=>p==null?void 0:p(),"handler")}),h.jsx(k,{isOpen:!0,children:h.jsx(R,{as:v,"data-testid":a,ref:w,role:"menu",style:{...$,...e},...s,"aria-hidden":!i,onMouseDown:c(g=>g.preventDefault(),"onMouseDown"),children:t})})}),{Option:N});export{Q as D};
