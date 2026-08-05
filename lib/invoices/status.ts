import type {InvoiceStatus} from "./types";
const transitions:Record<InvoiceStatus,InvoiceStatus[]>={draft:["issued","cancelled"],issued:["part_paid","paid","overdue","cancelled","credited"],part_paid:["paid","overdue","cancelled","credited"],overdue:["part_paid","paid","cancelled","credited"],paid:["credited"],cancelled:[],credited:[]};
export function canTransition(from:InvoiceStatus,to:InvoiceStatus){return transitions[from]?.includes(to)??false}
export function statusForBalance(total:number,paid:number,dueDate:string,today=new Date().toISOString().slice(0,10)):InvoiceStatus{if(paid>=total)return "paid";if(paid>0)return "part_paid";if(dueDate<today)return "overdue";return "issued"}
