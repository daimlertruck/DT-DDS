import{j as D}from"./jsx-runtime-CB_V9I5Y.js";import"./index-D9dZuxfj.js";import"./index-DapK0Eu1.js";import{D as L,P as z}from"./z-index-DWgeqfVW.js";import{r as b}from"./index-CTjT7uj6.js";import{u as m}from"./useClickOutside-CA5UtDJB.js";import{f as S}from"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-XjDa9cP3.js";const k=S.li`
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
`,B=b.forwardRef(({dataTestId:t,children:e,style:a,isDisabled:i,isSelected:r=!1,isHighlighted:o=!1,onClick:d,...l},x)=>{const p=t??"dropdown-option",u=s=>{if(i){s.preventDefault(),s.stopPropagation();return}d==null||d(s)};return D.jsx(k,{...l,"aria-disabled":i,"aria-selected":r,"data-highlighted":o,"data-testid":p,onClick:u,ref:x,style:a,children:e})}),I=S.div`
  list-style-type: none;
  width: 100%;
  overflow: auto;

  ${({theme:t})=>`
    padding: ${t.spacing.spacing_50} ${t.spacing.spacing_0};
    background-color: ${t.palette.surface.contrast};
    border-radius: ${t.shape.dropdown};
    border: 1px solid ${t.palette.border.medium};
  `}
`;function N({placement:t,anchor:e,menuWidth:a,menuHeight:i,offsetX:r,offsetY:o}){switch(t){case"bottom":return{top:e.bottom+o,left:e.left+r};case"top":return{top:e.top-o-i,left:e.left+r};case"right":return{top:e.top+o,left:e.right+r};case"left":return{top:e.top+o,left:e.left-r-a}}}function R(t,e,{offsetX:a=0,offsetY:i=4,matchWidth:r=!0,minViewportPadding:o=8,placement:d="bottom",menuRef:l}={}){const[x,p]=b.useState({visibility:"hidden",position:"fixed"});return b.useLayoutEffect(()=>{if(!e||!(t!=null&&t.current)){p({visibility:"hidden",position:"fixed"});return}const u=t==null?void 0:t.current,s=l==null?void 0:l.current,n=()=>{const y=window.innerWidth,w=window.innerHeight,v=u.getBoundingClientRect(),g=s==null?void 0:s.getBoundingClientRect(),h=r?v.width:(g==null?void 0:g.width)??v.width,O=(g==null?void 0:g.height)??0;let{top:$,left:M}=N({placement:d,anchor:v,menuWidth:h,menuHeight:O,offsetX:a,offsetY:i});const _=Math.max(o,y-h-o),j=Math.max(o,w-O-o);M=Math.max(o,Math.min(M,_)),$=Math.max(o,Math.min($,j)),p({position:"fixed",top:$,left:M,width:r?v.width:void 0,maxWidth:r?v.width:300,boxSizing:"border-box",zIndex:L})};n();const c=new ResizeObserver(n);c.observe(u),u&&c.observe(u);const f={passive:!0};return window.addEventListener("scroll",n,f),window.addEventListener("resize",n,f),()=>{c.disconnect(),window.removeEventListener("scroll",n,f),window.removeEventListener("resize",n,f)}},[l,t,e,d,a,i,r,o]),{style:x}}const H=(t,e)=>{if(t){if(typeof t=="function"){t(e);return}t.current=e}},G=Object.assign(b.forwardRef(({children:t,style:e,dataTestId:a="dropdown",isOpen:i=!1,anchorRef:r,matchWidth:o=!0,offsetX:d,offsetY:l,as:x="div",onClose:p,placement:u,...s},n)=>{const c=b.useRef(null),f=b.useCallback(w=>{c.current=w,H(n,w)},[n]),{style:y}=R(r,i,{matchWidth:o,offsetX:d,offsetY:l,placement:u,menuRef:c});return m({refs:[c,r],handler:()=>p==null?void 0:p()}),D.jsx(z,{isOpen:!0,children:D.jsx(I,{as:x,"data-testid":a,ref:f,role:"menu",style:{...y,...e},...s,"aria-hidden":!i,onMouseDown:w=>w.preventDefault(),children:t})})}),{Option:B});export{G as D};
