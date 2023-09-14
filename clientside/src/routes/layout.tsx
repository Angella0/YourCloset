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
import {AuthUserContext} from "~/routes/profile/layout";
import client from "~/api/feathersapi";


export interface Model {
    name?: string
}
export interface ProductsType{
    id:number;
    attributes:Attributes
}
export interface Attributes{
    "name": string;
    "shortDescription":string;
    "longDescription": string;
    "price": number;
    "category": string;
    "createdAt": string;
    "updatedAt": string;
    "publishedAt":string;
    "image":string;
}

export interface CartItem {
    id:number;
    qnty:number;
    image:string;
    price:number;
    attributes:Attributes
}
export const CartContextId = createContextId<Signal<CartItem[]>>("cart")
export const ProductsContextId = createContextId<ProductsType[]>("items")
export const QueryContextId = createContextId<Signal<string>>("query")
export const InputContextId = createContextId<Signal<boolean>>("inputHidden")

const productRouteLoader = routeLoader$<ProductsType[]>(async () => {
    const response = await fetch("http://127.0.0.1:1337/api/items?populate=image")
    const pData = await response.json()

    return pData.data
})

export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    };
});

export default component$(() => {
    const cart = useSignal<CartItem[]>([])
    useContextProvider(CartContextId,cart)
    const inputHidden = useSignal(true)
    useContextProvider(InputContextId,inputHidden)
    const query = useSignal("")
    useContextProvider(QueryContextId,query)
    const items = productRouteLoader()
    useContextProvider(ProductsContextId,items.value)
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
