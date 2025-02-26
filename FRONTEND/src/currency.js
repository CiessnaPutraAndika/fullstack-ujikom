export const convertToRp=(value)=>{

    return new Intl.NumberFormat("id-ID", {
       style: "currency",
       currency: "IDR"
     }).format(value);
   }