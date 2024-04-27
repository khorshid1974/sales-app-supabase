// export const useUtliltes = () => {
//   return ref()



// }
export function useUtliltes() {
  const convertStringToDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  const generateUuid = async () => {
    const supabase= useSupabaseClient();
    const { data, error } = await supabase
    .from('getuuid') // Use the extension function
    .select()
    .single()

    if (error) {
      console.error('Failed to generate UUID:', error)
      return null
    }
    console.log('UUID:', data);
    
    return data.uuid_generate_v4;
  }
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
    convertStringToDate, generateProductCode, generateUuid
  };
}