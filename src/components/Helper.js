export const TanggalIndo = (dt) => {
  const date = new Date(dt);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const TanggalLuar = (dt)=>{
  const date = new Date(dt);
  let month = date.getMonth() + 1;
  if(month <10){
    month = `0${month}`;
  }
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
}