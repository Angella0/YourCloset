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
import {json} from "stream/consumers";
import client from "~/api/feathersapi";
import {data} from "autoprefixer";


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

export interface CartItem {
    id: number;
    qnty: number;
    price: number;
    name: string;
}

export const CartContextId = createContextId<Signal<CartItem[]>>("cart")
export const QueryContextId = createContextId<Signal<string>>("query")
export const InputContextId = createContextId<Signal<boolean>>("inputHidden")
export const ProdContextId = createContextId<ProductsType[]>("products")
export const AuthUserContext = createContextId<Signal<string>>("authUser")

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
    const cart = useSignal<CartItem[]>([])
    useContextProvider(CartContextId, cart)
    const inputHidden = useSignal(true)
    useContextProvider(InputContextId, inputHidden)
    const query = useSignal("")
    useContextProvider(QueryContextId, query)
    const products = useProductsData()
    useContextProvider(ProdContextId, products.value)
    const authUser = useSignal("")
    useContextProvider(AuthUserContext, authUser)

    useVisibleTask$(() => {
        const localStorageCart = localStorage.getItem("cart")
        console.log()
        if (localStorageCart) {
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
