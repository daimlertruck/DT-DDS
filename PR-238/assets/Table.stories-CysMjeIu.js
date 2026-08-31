var g=Object.defineProperty;var o=(n,t)=>g(n,"name",{value:t,configurable:!0});import{t as C}from"./jsx-runtime-Br4tQxt1.js";import{t as r}from"./dt-dds-react-BJ0U2Vmj.js";import{t as d}from"./Tooltip-CV1x-ycZ.js";import"./tooltip-B7p4pHEA.js";import{t as v}from"./Avatar-BO8j0HaH.js";import"./src-DTbYyZKr.js";import{t as w}from"./IconButton-DPHwvLfO.js";import{t as j}from"./Tag-BzMQZhYZ.js";var e=C(),l=["Name","Email","Role","Status","Phone","Department","Location","Actions"],u=[["John Doe","john@example.com","Developer","green","+123456789","Engineering","New York",""],["Jane Smith","jane@example.com","Designer","yellow","+987654321","Design","San Francisco",""],["Alice Johnson","alice@example.com","Manager","grey","+135792468","Management","Los Angeles",""],["Bob Brown","bob@example.com","Engineer","green","+246813579","Engineering","Chicago",""]],h=o(n=>(0,e.jsx)("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...n,children:(0,e.jsx)("path",{d:"M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"})}),"InfoOutline"),T=o(n=>(0,e.jsx)("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",...n,children:(0,e.jsx)("path",{d:"M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"})}),"MoreVertical"),x={Name:"200px",Status:"120px",Actions:"fit-content"},y=o(n=>(0,e.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,e.jsx)(v,{size:"small",title:n}),n]}),"renderAvatarWithTitle"),f=o(n=>{const t={green:"success",yellow:"warning",grey:"secondary"}[n]||"secondary";return(0,e.jsx)(j,{border:"rounded",color:t,size:"small",children:{green:"ACTIVE",yellow:"PENDING",grey:"DEACTIVATED"}[n]})},"renderTag"),p=o((n,t)=>{const a=l[n];return{Name:y(t),Status:f(t),Actions:b()}[a]??t},"renderContent"),b=o(()=>(0,e.jsx)(w,{children:(0,e.jsx)(T,{})}),"renderActionsButton"),G={title:"Data Display/Table",component:r,render:o(({isFixed:n,hasFixedHeader:t})=>(0,e.jsx)("div",{style:{...t&&{height:"200px",overflow:"auto"}},children:(0,e.jsxs)(r,{isFixed:n,children:[(0,e.jsx)(r.Head,{hasFixedHeader:t,children:(0,e.jsx)(r.Row,{children:l.map(a=>(0,e.jsx)(r.ColumnHeader,{dataTestId:"test",children:(0,e.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:4},children:[a,a==="Status"&&(0,e.jsxs)(d,{children:[(0,e.jsx)(h,{height:16,width:16}),(0,e.jsx)(d.Content,{children:"Pending: Yellow | Active: Green | Deactivated: Grey"})]})]})},`column-header-${a}`))})}),(0,e.jsx)(r.Body,{children:u.map(a=>(0,e.jsx)(r.Row,{children:a.map((m,c)=>(0,e.jsx)(r.DataCell,{columnWidth:x[l[c]],children:p(c,m)},`column-${l[c]}-${m}`))},a.toString()))})]})}),"render")},i={args:{isFixed:!1,hasFixedHeader:!1}},D=1,A=2,s={title:"Table",component:r,render:o(()=>(0,e.jsx)("div",{style:{width:"500px",overflow:"auto"},children:(0,e.jsxs)(r,{fixedColumnCount:D,fixedEndColumnCount:A,children:[(0,e.jsx)(r.Head,{children:(0,e.jsx)(r.Row,{children:l.map(n=>(0,e.jsx)(r.ColumnHeader,{dataTestId:"test",children:(0,e.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:4},children:[n,n==="Status"&&(0,e.jsxs)(d,{children:[(0,e.jsx)(h,{height:16,width:16}),(0,e.jsx)(d.Content,{children:"Pending: Yellow | Active: Green | Deactivated: Grey"})]})]})},`column-header-${n}`))})}),(0,e.jsx)(r.Body,{children:u.map(n=>(0,e.jsx)(r.Row,{children:n.map((t,a)=>(0,e.jsx)(r.DataCell,{columnWidth:x[l[a]],style:{...l[a]==="Actions"&&{minWidth:"65px"}},children:p(a,t)},`column-${l[a]}-${t}`))},n.toString()))})]})}),"render")};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    isFixed: false,
    hasFixedHeader: false
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};var N=["Default","TableWithPinnedColumns"];export{i as Default,s as TableWithPinnedColumns,N as __namedExportsOrder,G as default};
