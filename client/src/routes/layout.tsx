import {
    component$,
    createContextId,
    Signal,
    Slot,
    useContextProvider,
    useSignal,
    useVisibleTask$
} from "@builder.io/qwik";
import {routeLoader$} from '@builder.io/qwik-city';
import NavBar from "~/components/navBar";
import Footer from "~/components/footer/footer";
import client from "~/api/feathersapi";
import {AuthUserContext} from "~/routes/profile/layout";



export interface Model {
    name?: string
}

export interface ProductsType {
    "_id": string
    "name": string
    "shortDescription"?: string
    "longDescription"?: string
    "price": number
    "category": CategoryType
    "image": string
}

export interface CategoryType {
    "name": string
    "_id": string
}

export interface CartItem{
    "_id": string
    "name"?: string
    "qty": number
    "shortDescription"?: string
    "longDescription"?: string
    "price"?: number
    "category"?: CategoryType
    "image"?: string



}

export const CartContextId = createContextId<Signal<CartItem[]>>("cart")
export const QueryContextId = createContextId<Signal<string>>("query")
export const InputContextId = createContextId<Signal<boolean>>("inputHidden")
export const ProdContextId = createContextId<ProductsType[]>("products")


export const useProductsData = routeLoader$<ProductsType[]>(async () => {
    try {
        const {data} = await client.service("products").find();
        return data;
    } catch (e) {
        console.log(e)
    }

})


export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    };
});

export default component$(() => {

    /////////variables
    const cart = useSignal<CartItem[]>([])
    const inputHidden = useSignal(true)
    const query = useSignal("")
    const products = useProductsData()

    //////////ContextIds
    useContextProvider(CartContextId, cart)
    useContextProvider(InputContextId, inputHidden)
    useContextProvider(QueryContextId, query)
    useContextProvider(ProdContextId, products.value)



    const authUser = useSignal()
    useContextProvider(AuthUserContext,authUser)

    useVisibleTask$(async () => {
        try {
            const localStorageCart = localStorage.getItem("cart")
            if (localStorageCart) {
                cart.value = JSON.parse(localStorageCart)
            }
            await client.reAuthenticate()
            const {user} = await client.get('authentication')
            authUser.value = user

        } catch (e) {
            console.log(e)
        }

    })





    return (
        <>

            <main class="flex-1 flex flex-col min-b-screen">
                <NavBar/>
                <Slot/>
            </main>
            <Footer/>


        </>
    );
});