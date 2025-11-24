var z=Object.defineProperty;var c=(t,e)=>z(t,"name",{value:e,configurable:!0});import{j as $}from"./jsx-runtime-Cgz2XvFB.js";import"./typography-B3nKKPHm.js";import"./index-C08Z9NF3.js";import{D as _,P as B}from"./z-index-BB_IPOEl.js";import{r as b}from"./index-CwbBKW39.js";import{u as I}from"./useClickOutside-Cp2kQToC.js";import{f as j}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./index-DV-VXEUn.js";const N=j.li`
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
`,R=b.forwardRef(({dataTestId:t,children:e,style:d,isDisabled:r,isSelected:i=!1,isHighlighted:o=!1,onClick:a,...l},g)=>{const u=t??"dropdown-option",p=c(s=>{if(r){s.preventDefault(),s.stopPropagation();return}a==null||a(s)},"handleClick");return $.jsx(N,{...l,"aria-disabled":r,"aria-selected":i,"data-highlighted":o,"data-testid":u,onClick:p,ref:g,style:d,children:e})}),k=j.div`
  list-style-type: none;
  width: 100%;
  overflow: auto;
`;function H({placement:t,anchor:e,menuWidth:d,menuHeight:r,offsetX:i,offsetY:o}){switch(t){case"bottom":return{top:e.bottom+o,left:e.left+i};case"top":return{top:e.top-o-r,left:e.left+i};case"right":return{top:e.top+o,left:e.right+i};case"left":return{top:e.top+o,left:e.left-i-d}}}c(H,"basePos");function F(t,e,{offsetX:d=0,offsetY:r=4,matchWidth:i=!0,minViewportPadding:o=8,placement:a="bottom",menuRef:l}={}){const[g,u]=b.useState({visibility:"hidden",position:"fixed"});return b.useLayoutEffect(()=>{if(!e||!(t!=null&&t.current)){u({visibility:"hidden",position:"fixed"});return}const p=t==null?void 0:t.current,s=l==null?void 0:l.current,n=c(()=>{const h=window.innerWidth,v=window.innerHeight,y=p.getBoundingClientRect(),x=s==null?void 0:s.getBoundingClientRect(),O=i?y.width:(x==null?void 0:x.width)??y.width,S=(x==null?void 0:x.height)??0;let{top:M,left:D}=H({placement:a,anchor:y,menuWidth:O,menuHeight:S,offsetX:d,offsetY:r});const m=Math.max(o,h-O-o),L=Math.max(o,v-S-o);D=Math.max(o,Math.min(D,m)),M=Math.max(o,Math.min(M,L)),u({position:"fixed",top:M,left:D,width:i?y.width:void 0,maxWidth:i?y.width:300,boxSizing:"border-box",zIndex:_})},"updatePosition");n();const f=new ResizeObserver(n);f.observe(p),p&&f.observe(p);const w={passive:!0};return window.addEventListener("scroll",n,w),window.addEventListener("resize",n,w),()=>{f.disconnect(),window.removeEventListener("scroll",n,w),window.removeEventListener("resize",n,w)}},[l,t,e,a,d,r,i,o]),{style:g}}c(F,"useFloatingPosition");const P=c((t,e)=>{if(t){if(typeof t=="function"){t(e);return}t.current=e}},"setRef"),Q=Object.assign(b.forwardRef(({children:t,style:e,dataTestId:d="dropdown",isOpen:r=!1,anchorRef:i,matchWidth:o=!0,offsetX:a,offsetY:l,as:g="div",onClose:u,placement:p,...s},n)=>{const f=b.useRef(null),w=b.useCallback(v=>{f.current=v,P(n,v)},[n]),{style:h}=F(i,r,{matchWidth:o,offsetX:a,offsetY:l,placement:p,menuRef:f});return I({refs:[f,i],handler:c(()=>u==null?void 0:u(),"handler")}),$.jsx(B,{isOpen:!0,children:$.jsx(k,{as:g,"data-testid":d,ref:w,role:"menu",style:{...h,...e},...s,"aria-hidden":!r,onMouseDown:c(v=>v.preventDefault(),"onMouseDown"),children:t})})}),{Option:R});export{Q as D};
