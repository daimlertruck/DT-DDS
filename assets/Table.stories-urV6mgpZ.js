var v=Object.defineProperty;var a=(n,o)=>v(n,"name",{value:o,configurable:!0});import{n as b}from"./rolldown-runtime-CzYk_CEw.js";import{t as _}from"./jsx-runtime-Br4tQxt1.js";import{i as D,n as t,r as A,t as S}from"./dt-dds-react-C0ZgBy3n.js";import{t as d}from"./Tooltip-CT9B0ev5.js";import{t as I}from"./tooltip-DCNfJ5Q_.js";import{t as H}from"./Avatar-BUUWxos7.js";import{r as E}from"./src-C93EZzXl.js";import{t as B}from"./IconButton-yXF3faAu.js";import{t as M}from"./Tag-Da_ov8nS.js";var e,i,c,u,g,h,C,w,p,T,R,l,j,f,s,$;function y(){return(y=b((()=>{S(),E(),D(),I(),A(),e=_(),i=["Name","Email","Role","Status","Phone","Department","Location","Actions"],c=[["John Doe","john@example.com","Developer","green","+123456789","Engineering","New York",""],["Jane Smith","jane@example.com","Designer","yellow","+987654321","Design","San Francisco",""],["Alice Johnson","alice@example.com","Manager","grey","+135792468","Management","Los Angeles",""],["Bob Brown","bob@example.com","Engineer","green","+246813579","Engineering","Chicago",""]],u=a(n=>(0,e.jsx)("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...n,children:(0,e.jsx)("path",{d:"M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"})}),"InfoOutline"),g=a(n=>(0,e.jsx)("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...n,children:(0,e.jsx)("path",{d:"M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"})}),"MoreVertical"),h={Name:"200px",Status:"120px",Actions:"fit-content"},C=a(n=>(0,e.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,e.jsx)(H,{size:"small",title:n}),n]}),"renderAvatarWithTitle"),w=a(n=>{const o={green:"success",yellow:"warning",grey:"secondary"}[n]||"secondary";return(0,e.jsx)(M,{border:"rounded",color:o,size:"small",children:{green:"ACTIVE",yellow:"PENDING",grey:"DEACTIVATED"}[n]})},"renderTag"),p=a((n,o)=>{const r=i[n];return{Name:C(o),Status:w(o),Actions:T()}[r]??o},"renderContent"),T=a(()=>(0,e.jsx)(B,{children:(0,e.jsx)(g,{})}),"renderActionsButton"),R={title:"Data Display/Table",component:t,render:a(({isFixed:n,hasFixedHeader:o})=>(0,e.jsx)("div",{style:{...o&&{height:"200px",overflow:"auto"}},children:(0,e.jsxs)(t,{isFixed:n,children:[(0,e.jsx)(t.Head,{hasFixedHeader:o,children:(0,e.jsx)(t.Row,{children:i.map(r=>(0,e.jsx)(t.ColumnHeader,{dataTestId:"test",children:(0,e.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:4},children:[r,r==="Status"&&(0,e.jsxs)(d,{children:[(0,e.jsx)(u,{height:16,width:16}),(0,e.jsx)(d.Content,{children:"Pending: Yellow | Active: Green | Deactivated: Grey"})]})]})},`column-header-${r}`))})}),(0,e.jsx)(t.Body,{children:c.map(r=>(0,e.jsx)(t.Row,{children:r.map((x,m)=>(0,e.jsx)(t.DataCell,{columnWidth:h[i[m]],children:p(m,x)},`column-${i[m]}-${x}`))},r.toString()))})]})}),"render")},l={args:{isFixed:!1,hasFixedHeader:!1}},j=1,f=2,s={title:"Table",component:t,render:a(()=>(0,e.jsx)("div",{style:{width:"500px",overflow:"auto"},children:(0,e.jsxs)(t,{fixedColumnCount:j,fixedEndColumnCount:f,children:[(0,e.jsx)(t.Head,{children:(0,e.jsx)(t.Row,{children:i.map(n=>(0,e.jsx)(t.ColumnHeader,{dataTestId:"test",children:(0,e.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:4},children:[n,n==="Status"&&(0,e.jsxs)(d,{children:[(0,e.jsx)(u,{height:16,width:16}),(0,e.jsx)(d.Content,{children:"Pending: Yellow | Active: Green | Deactivated: Grey"})]})]})},`column-header-${n}`))})}),(0,e.jsx)(t.Body,{children:c.map(n=>(0,e.jsx)(t.Row,{children:n.map((o,r)=>(0,e.jsx)(t.DataCell,{columnWidth:h[i[r]],style:{...i[r]==="Actions"&&{minWidth:"65px"}},children:p(r,o)},`column-${i[r]}-${o}`))},n.toString()))})]})}),"render")},$=["Default","TableWithPinnedColumns"],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    isFixed: false,
    hasFixedHeader: false
  }
}`,...l.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}}})))()}a(y,"init_Table_stories");y();export{l as Default,s as TableWithPinnedColumns,$ as __namedExportsOrder,R as default};
