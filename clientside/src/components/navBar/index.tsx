import {component$, useContext, useSignal, useStore, $} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {CartContextId,InputContextId, QueryContextId} from "~/routes/layout";


export default component$(() => {

    const query = useContext(QueryContextId)
    const inputHidden = useContext(InputContextId)
    const iconHidden = useSignal(false)
    const cart = useContext(CartContextId)



    const store = useStore({
        scrolled: false,
        numItems: 0,
        modal: false,
    })
    const checkout = $(async () => {


    })




    return (
        <header
            class={"flex justify-between top-0 left-0 items-center w-full p-4 fixed z-20" + (store.scrolled ? ' bg-slate-900 shadow text-white' : ' bg-transparent')} document: onScroll$={() => {
            if (window.scrollY > 0) {
                store.scrolled = true
            } else {
                store.scrolled = false
            }

        }}>
            <div>
                <Link href={"/"}>
                    <h2 class="font-bold">ECOMMERCE</h2>
                </Link>
            </div>
            <div class="flex justify-between p-2">
                <div>
                    {inputHidden.value ? null : <label class="pr-2 z-20">
                        <input class="input input-bordered flex w-[150px] h-[25px] text-black" placeholder="search"
                               bind:value={query} onMouseLeave$={() => {
                            inputHidden.value = true;
                            iconHidden.value = false;
                        }}/>
                    </label>}
                </div>
                <div class="flex">
                    <div class="pr-4">
                        {iconHidden.value ? null : <button onClick$={() => {
                            inputHidden.value = false;
                            iconHidden.value = true;
                        }}><i class="fa-solid fa-magnifying-glass pr-4"></i></button>}
                    </div>
                    <div>
                        <Link href={"/profile"}>
                            <i class="fa-solid fa-user pr-4 cursor-pointer"></i>
                        </Link>
                    </div>

                    <div class="relative cursor-pointer" onClick$={() => {
                        store.modal = true
                    }}>
                        <i class="fa-solid fa-cart-shopping"></i>
                        {cart.value.length > 0 && <div
                            class="absolute -top-2 -right-2 bg-red-500 rounded-full h-5 w-5 text-xs grid place-items-center">{cart.value.length}</div>}
                    </div>
                </div>
                {store.modal && <>
                <form method="POST" action="https://checkout.flutterwave.com/v3/hosted/pay">
                    <div id="modal"
                         class="absolute top-0 shadow right-0 w-full h-screen overflow-scroll bg-white z-50 flex flex-col gap-4 p-4 sm:w-[500px] text-slate-900">
                        <div class="flex items-center justify-between pb-4 border-b">
                            <h1 class="font-bold">CART</h1>
                            <i id="modal-close" onClick$={() => {
                                store.modal = false
                            }} class="fa-solid fa-xmark cursor-pointer hover:rotate-45 "></i>
                        </div>
                        {cart.value.length ?
                            <div class="bg-slate-400 flex flex-col gap-[1px]">
                                {cart.value.map((item, i) => {
                                    return (
                                        <div class="bg-white p-4 flex items-center justify-between">
                                            <div class="flex gap-1">
                                                <img alt="" class="h-[80px] w-[80px] object-cover" src={item.attributes?.image}/>
                                                <div class="flex flex-col">
                                                    <p>{item.attributes?.name}</p>
                                                    <p>$ {item.attributes?.price}</p>
                                                    <p>Quantity: {item.qnty}</p>
                                                </div>

                                            </div>
                                            <i onClick$={() => {
                                                cart.value = cart.value.reduce((acc, curr, index) => {
                                                    if (index !== i) {
                                                        return [...acc, curr]
                                                    }
                                                    return acc
                                                }, [])
                                            }}
                                               class="fa-solid fa-xmark text-sm cursor-pointer hover:opacity-40"></i>
                                        </div>
                                )
                                })}
                                <input type="hidden" name="public_key" value="FLWPUBK_TEST-890b7eb4a55b40033c65102ee099bfa7-X" />
                                <button class=" btn bg-gray-800 text-white p-3 rounded"
                                        type="submit"
                                        onclick$={() => checkout()}>Checkout
                                </button>
                            </div>
                            : <div>
                                <h3 class="text-sm">Your Cart Is Empty</h3></div>}
                    </div>
                </form>
                </>}
            </div>
        </header>
    );
});


