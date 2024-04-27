
export function useAdminUtliltes() {

  const getRole= (role, state) => {
    const myUserState= useUser('user');
    
      if (!myUserState.value.roles) return false;
      if (!state){
        const myRole= myUserState.value.roles.find((r) => r.role_name === role);
        console.log('myRole', myRole);
        if (!myRole) return false;
       
      return true;
      }  else {
        const myRole= myUserState.value.roles.find((r) => r.entity_name === role);
        //console.log('myRole', myRole);
        if (!myRole) return false;
       console.log('Iam not here');
       //console.log('myRole[state]', myRole[state]);
        return myRole[state];
      }
      
    };
    return {
      getRole, 
    };
  }

