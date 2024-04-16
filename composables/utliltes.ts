// export const useUtliltes = () => {
//   return ref()
// }
export function useUtliltes() {
  const convertStringToDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  const generateProductCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code as string;
}
  return {
    convertStringToDate, generateProductCode
  };
}