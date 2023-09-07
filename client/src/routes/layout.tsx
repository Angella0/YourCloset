import {component$, createContextId, Slot, useContextProvider, useSignal, useVisibleTask$} from "@builder.io/qwik";
import {routeLoader$} from '@builder.io/qwik-city';

import NavBar from "~/components/navBar";
import Footer from "~/components/footer/footer";
import {json} from "stream/consumers";


export interface Model {
    name?: string
}

export interface CartItem {
    id:number;
    qnty:number;
    price:number
}

export const CartContextId = createContextId("cart")
export const ProductsContextId = createContextId("items")
export const QueryContextId = createContextId("query")
export const InputContextId = createContextId("inputHidden")

const productRouteLoader = routeLoader$(async () => {
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
    useContextProvider(ProductsContextId,items)

    useVisibleTask$(() =>{
        const localStorageCart = localStorage.getItem("cart")
        if(localStorageCart){
            cart.value = JSON.parse(localStorageCart)
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
