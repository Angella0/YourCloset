import {component$, useContext, useSignal, useStore, useComputed$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {CartContextId, CartItem, InputContextId, ProductsContextId, QueryContextId} from "~/routes/layout";
import {imageItem} from "~/routes/imageItem";


export default component$(() => {

    const query = useContext(QueryContextId)
    const inputHidden = useContext(InputContextId)
    const iconHidden = useSignal(false)
    const cart = useContext(CartContextId)
    const item = useContext(ProductsContextId)


    const store = useStore({
        scrolled: false,
        numItems: 0,
        modal: false,
    })

    // const total = useComputed$(() => cart.value.reduce((acc, line) => {
    //     const product = item.find(prod => prod.id == line.id) as CartItem;
    //     const price = product.price
    //     const tt = price * line.qnty;
    //     return acc + tt
    // }, 0))


    return (
        <header
            class={"flex justify-between top-0 left-0 items-center w-full p-4 fixed z-20" + (store.scrolled ? ' bg-slate-900 shadow text-white' : ' bg-transparent')}
            document:onScroll $={() => {
            if (window.scrollY > 0) {
                store.scrolled = true
            } else {
                store.scrolled = false
            }

        }}>
            <div>
                <a class="font-bold">ECOMMERCE</a>
            </div>
            <div class="flex justify-between p-2">
                <div>
                    {inputHidden.value ? null : <label class="pr-2 z-20">
                        <input className="input input-bordered flex w-[150px] h-[25px] text-black" placeholder="search"
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
                        }}><i className="fa-solid fa-magnifying-glass pr-4"></i></button>}
                    </div>
                    <div>
                        <i className="fa-solid fa-user pr-4 cursor-pointer"></i>
                    </div>

                    <div className="relative cursor-pointer" onClick$={() => {
                        store.modal = true
                    }}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        {cart.value.length > 0 && <div
                            className="absolute -top-2 -right-2 bg-red-500 rounded-full h-5 w-5 text-xs grid place-items-center">{cart.value.length}</div>}
                    </div>
                </div>
                {store.modal && <>
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
                                                <img class="h-[80px] w-[80px] object-cover" src={imageItem(item.id)}/>
                                                <div class="flex flex-col">
                                                    <p>{item.id.attributes.name}</p>
                                                    <p>$ {item.id.attributes.price}</p>
                                                    <p>Quantity: {item.qty}</p>
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
                                    // <div>Total: $ {total.value}</div>
                                )
                                })}
                                <button
                                    class=" btn bg-gray-800 text-white p-3 rounded">Checkout
                                </button>
                            </div>
                            : <div>
                                <h3 class="text-sm">Your Cart Is Empty</h3></div>}
                    </div>
                </>}
            </div>
        </header>
    );
});


