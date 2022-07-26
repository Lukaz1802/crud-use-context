export default function appReducer(state, action) {

    
    switch (action.type) {
        case 'ADD_USER':
            
            return{
                Users: [...state?.Users, action?.payload]
                 
                }

        case 'DELETE_USER':
            const pos = Object.keys(state.Users).indexOf('id')
            state.Users.splice(pos, 1)
            
            return {
                Users: state?.Users?.filter(User => User?.id !== action?.payload)           
            }
    
        //     case 'DELETE_ALL_ARTICLE':
        //     localStorage?.setItem("Articulos", JSON.stringify([]))
        //     return {
        //         Articulos: state?.Articulos           
        //     }
    
        // case 'UPDATE_ARTICLE': 
        //     const updatedArticle = action.payload
    
        //  const updateTasks =  state?.Articulos?.map(Articulo => {
        //         if(Articulo?.id === updatedArticle?.id){
        //             Articulo.id = updatedArticle?.id
        //             Articulo.ItemName = updatedArticle?.ItemName
        //             Articulo.BarCode = updatedArticle?.BarCode
        //             Articulo.Mainsupplier = updatedArticle?.Mainsupplier
        //             Articulo.SupplierCatalogNo = updatedArticle?.SupplierCatalogNo
        //             Articulo.SWW = updatedArticle?.SupplierCatalogNo
        //             Articulo.ArTaxCode = updatedArticle?.ArTaxCode
        //             Articulo.ApTaxCode = updatedArticle?.ArTaxCode
        //             Articulo.U_Rubro = updatedArticle?.U_Rubro
        //             Articulo.U_Subrubros = updatedArticle?.U_Subrubros
        //             Articulo.ItemsGroupCode = updatedArticle?.ItemsGroupCode
        //             Articulo.U_Marca = updatedArticle?.U_Marca
        //             Articulo.Price = updatedArticle?.Price
        //             Articulo.ItemPrices[0].Price = updatedArticle?.ItemPrices[0]?.Price
                
        //         }
        //         return Articulo
    
        //     })
        //      return {
        //         Articulos: updateTasks
        //      }
    
        default:
            break;
    }
    }