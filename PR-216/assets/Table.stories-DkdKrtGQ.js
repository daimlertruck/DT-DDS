var f=Object.defineProperty;var i=(n,o)=>f(n,"name",{value:o,configurable:!0});import{j as e}from"./jsx-runtime-Cgz2XvFB.js";import"./index-CwbBKW39.js";import"./AccordionBody.styled-6xpzeHEO.js";import"./Icon-Cizr_oyr.js";import{A as v}from"./Avatar-BVyjdu_a.js";import"./Backdrop-DFcWWBuv.js";import"./index-DjK96f-n.js";import"./Breadcrumb-BiEcmLRA.js";import"./typography-B3nKKPHm.js";import"./index-BRdX3iqP.js";import"./index-DLLwJ4dj.js";import"./Divider.styled-CREBr8aj.js";import"./Drawer-D6mOj1x-.js";import"./EmptyState-DTedqhP0.js";import"./Typography-DXnuNw4S.js";import"./LabelField-CB1xORCY.js";import"./Message-COyUDkt8.js";import"./Spinner-C6HrIguK.js";import"./Tabs-C-jpne0G.js";import{T as b}from"./Tag-HppwdmJV.js";import"./index-FFYuqb-e.js";import"./Button.styled-CRw3qLAu.js";import{T as m}from"./Tooltip-BJbu7ZXU.js";import"./Checkbox-Fi0eMJlN.js";import"./TextField-DJ3HRylC.js";import{T as t}from"./Table-COLZs-2E.js";import"./ProgressBar.styled-CPQDdLU-.js";import"./Select-BCLK52cf.js";import"./Stepper-Tt6fqgbh.js";import"./Radio.styled-Ch9pnEKd.js";import"./Modal-BM0XGnA_.js";import"./Card-DDNnuBvi.js";import"./SegmentedControl-CIWMFaEV.js";import"./Dropdown-3aTCh5z8.js";import"./Toggle.styled-DkKF6m-7.js";import"./DatePicker.styled-CPh78zdb.js";import"./TextArea.styled-C0aFn1ml.js";import"./Form-De4SCaaJ.js";import"./PaginationNavButton-D0N7M9yH.js";import{I as D}from"./IconButton-DzFaQPvx.js";import"./Link-CXt-bU06.js";import"./Sidebar-DclAInTV.js";import"./index-Cma4H4F9.js";import"./emotion-styled.browser.esm-DNXn-wKZ.js";import"./Avatar.styled-CJVU208S.js";import"./hexToRgba-CWpEuk8w.js";import"./z-index-BPuITISp.js";import"./useMedia-CRgJMRRc.js";import"./useDebounceResize-D9rzYsUV.js";import"./emotion-react.browser.esm-BHtS0gci.js";import"./index-6Tx4pmSd.js";import"./iframe-D40-73gS.js";import"./index-Cf7F2iyz.js";import"./useClickOutside-Cp2kQToC.js";const l=["Name","Email","Role","Status","Phone","Department","Location","Actions"],w=[["John Doe","john@example.com","Developer","green","+123456789","Engineering","New York",""],["Jane Smith","jane@example.com","Designer","yellow","+987654321","Design","San Francisco",""],["Alice Johnson","alice@example.com","Manager","grey","+135792468","Management","Los Angeles",""],["Bob Brown","bob@example.com","Engineer","green","+246813579","Engineering","Chicago",""]],T=i(n=>e.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...n,children:e.jsx("path",{d:"M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"})}),"InfoOutline"),A=i(n=>e.jsx("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...n,children:e.jsx("path",{d:"M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"})}),"MoreVertical"),j={Name:"200px",Status:"120px",Actions:"fit-content"},S=i(n=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(v,{size:"small",title:n}),n]}),"renderAvatarWithTitle"),I=i(n=>{const o={green:"success",yellow:"warning",grey:"secondary"}[n]||"secondary";return e.jsx(b,{border:"rounded",color:o,size:"small",children:{green:"ACTIVE",yellow:"PENDING",grey:"DEACTIVATED"}[n]})},"renderTag"),y=i((n,o)=>{const r=l[n];return{Name:S(o),Status:I(o),Actions:E()}[r]??o},"renderContent"),E=i(()=>e.jsx(D,{children:e.jsx(A,{})}),"renderActionsButton"),Re={title:"Data Display/Table",component:t,render:i(({isFixed:n,hasFixedHeader:o})=>e.jsx("div",{style:{...o&&{height:"200px",overflow:"auto"}},children:e.jsxs(t,{isFixed:n,children:[e.jsx(t.Head,{hasFixedHeader:o,children:e.jsx(t.Row,{children:l.map(r=>e.jsx(t.ColumnHeader,{dataTestId:"test",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[r,r==="Status"&&e.jsxs(m,{children:[e.jsx(T,{height:16,width:16}),e.jsx(m.Content,{children:"Pending: Yellow | Active: Green | Deactivated: Grey"})]})]})},`column-header-${r}`))})}),e.jsx(t.Body,{children:w.map(r=>e.jsx(t.Row,{children:r.map((d,c)=>e.jsx(t.DataCell,{columnWidth:j[l[c]],children:y(c,d)},`column-${l[c]}-${d}`))},r.toString()))})]})}),"render")},s={args:{isFixed:!1,hasFixedHeader:!1}},H=1,B=2,a={title:"Table",component:t,render:i(()=>e.jsx("div",{style:{width:"500px",overflow:"auto"},children:e.jsxs(t,{fixedColumnCount:H,fixedEndColumnCount:B,children:[e.jsx(t.Head,{children:e.jsx(t.Row,{children:l.map(n=>e.jsx(t.ColumnHeader,{dataTestId:"test",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[n,n==="Status"&&e.jsxs(m,{children:[e.jsx(T,{height:16,width:16}),e.jsx(m.Content,{children:"Pending: Yellow | Active: Green | Deactivated: Grey"})]})]})},`column-header-${n}`))})}),e.jsx(t.Body,{children:w.map(n=>e.jsx(t.Row,{children:n.map((o,r)=>e.jsx(t.DataCell,{columnWidth:j[l[r]],style:{...l[r]==="Actions"&&{minWidth:"65px"}},children:y(r,o)},`column-${l[r]}-${o}`))},n.toString()))})]})}),"render")};var p,h,u;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    isFixed: false,
    hasFixedHeader: false
  }
}`,...(u=(h=s.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var x,C,g;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  title: 'Table',
  component: Table,
  render: () => <div style={{
    width: '500px',
    overflow: 'auto'
  }}>
      <Table fixedColumnCount={fixedColumnCount} fixedEndColumnCount={fixedEndColumnCount}>
        <Table.Head>
          <Table.Row>
            {columns.map((column: string) => <Table.ColumnHeader dataTestId='test' key={\`column-header-\${column}\`}>
                <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
                  {column}
                  {column === 'Status' && <Tooltip>
                      <InfoOutline height={16} width={16} />
                      <Tooltip.Content>
                        Pending: Yellow | Active: Green | Deactivated: Grey
                      </Tooltip.Content>
                    </Tooltip>}
                </div>
              </Table.ColumnHeader>)}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row: string[]) => <Table.Row key={row.toString()}>
              {row.map((content: string, i: number) => <Table.DataCell columnWidth={columnSizes[columns[i]]} key={\`column-\${columns[i]}-\${content}\`} style={{
            ...(columns[i] === 'Actions' && {
              minWidth: '65px'
            })
          }}>
                  {renderContent(i, content)}
                </Table.DataCell>)}
            </Table.Row>)}
        </Table.Body>
      </Table>
    </div>
}`,...(g=(C=a.parameters)==null?void 0:C.docs)==null?void 0:g.source}}};const $e=["Default","TableWithPinnedColumns"];export{s as Default,a as TableWithPinnedColumns,$e as __namedExportsOrder,Re as default};
