import { createContext, useReducer } from "react";
import { v4 } from "uuid";
import  appReducer from "./AppReducer"


let initialState = {
  Users: [
    {
      "id": "z33ffe50-7cbb-2j15-a6d7-ec4b29d71kza",
      "fullname": "Eric Olsen",
      "age": 25,
      "image": "https://i.pravatar.cc/50?u=1",
      "socialUrl": "https://www.instagram.com/eric-olsen",
      "isAdmin": true,
      "status": "activo"
    },
    {
      "id": "u00ffe50-7cbb-4315-afd2-ec4b29d09jkl",
      "fullname": "Cailyn Warner",
      "age": 30,
      "image": "https://i.pravatar.cc/50?u=2",
      "socialUrl": "https://www.instagram.com/cailyn-warner",
      "isAdmin": false,
      "status": "activo"
    },
    {
      "id": "ñ00ffe50-7cbb-4d15-j5k8-fb6b29d32lke",
      "fullname": "Danna Simpson",
      "age": 27,
      "image": "https://i.pravatar.cc/50?u=3",
      "socialUrl": "https://www.instagram.com/danna-simpson",
      "isAdmin": false,
      "status": "inactivo"
    },
    {
      "id": "p77ffe50-7cbb-4d15-a6d7-ec4b29d79lio",
      "fullname": "Frank Simpson",
      "age": 27,
      "image": "https://i.pravatar.cc/50?u=4",
      "socialUrl": "https://www.instagram.com/frank-simpson",
      "isAdmin": false,
      "status": "pendiente"
    },
    {
      "id": "y60r3e50-7cbb-4d15-a6d7-ec4b29d76uut",
      "fullname": "Victor Walker",
      "age": 33,
      "image": "https://i.pravatar.cc/50?u=5",
      "socialUrl": "https://www.instagram.com/victor-walker",
      "isAdmin": false,
      "status": "inactivo"
    },
    {
      "id": "lm0ffe50-7cbb-4d15-a6d7-ec4b29d33gfa",
      "fullname": "Melany Frank",
      "age": 29,
      "image": "https://i.pravatar.cc/50?u=6",
      "socialUrl": "https://www.instagram.com/melany-frank",
      "isAdmin": true,
      "status": "activo"
    }
  ],
};


export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, initialState)


   


    const addUser = (User) => dispatch({type:'ADD_USER', payload:{...User, id: v4() }})
    
    const deleteUser = (id) =>  dispatch({type:'DELETE_USER', payload:id})
    // const updateArticle = (Articulo) => dispatch({type:'UPDATE_ARTICLE', payload: Articulo })

    // const deleteAllArticle = (Users) => dispatch({type:'DELETE_ALL_ARTICLE', payload:Users})

  return (
    <GlobalContext.Provider value={{...state,addUser,deleteUser}}>
      {children}
    </GlobalContext.Provider>
  );
};
