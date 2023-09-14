import {component$, useContext, useComputed$, useSignal, Signal, $} from "@builder.io/qwik";
import {DocumentHead, useLocation} from "@builder.io/qwik-city";
import {CartContextId, CartItem, Model, ProductsContextId} from "~/routes/layout";
import {imageItem} from "~/routes/imageItem";

export default component$(() => {

    const loc = useLocation();
    const cart = useContext<Signal<CartItem[]>>(CartContextId)
    const item = useContext(ProductsContextId)
    const items = useComputed$(() => {
        return item.find(itm => itm.id == parseInt(loc.params.id, 10))
    })
    const dialog = useSignal<HTMLDialogElement>()
    const selected = useSignal()
    const qty = useSignal('1');

    const addToCart = $((id?: number, qt?: number) => {
        const cartItem: CartItem = {id, qty: qt} as CartItem;
        // Mutate the Cart do not do a pushs
        if (cart.value.some(item => item.id == id)) {
            // const comItem = cart.value.find(catItm => catItm.id == id) as CartItem;
            // comItem.qty += 1;
            // const index = cart.value.findIndex(catItm => catItm.id == id)
            // cart.value.splice(index, 1, comItem)
            // const product = items.find(prod => prod.id == id) as Items;
            // confirm(Adding another ${items.attributes.name}?);
        } else {
            cart.value = [...cart.value, cartItem]
        }

        // clear form
        selected.value = undefined;
        qty.value = '1'
        dialog.value?.close()
        // persist cart
        localStorage.setItem('cart', JSON.stringify(cart.value))
    })
    const openAddToCartDialog = $(() => {
        selected.value = items.value;
        dialog.value?.showModal()
    })


    return (
        <div class="p-20">
            <dialog ref={dialog}>
                <form>
                    <p>item: <strong>{selected.value?.attributes.name}</strong></p>
                    <div>
                        <p>Qty</p>
                        <input type='number' bind:value={qty} min={1}/>
                    </div>
                    <div>
                        <p>Price</p>
                        <p>$<strong>{parseInt(qty.value, 10) * (selected.value?.attributes.price || 0)}</strong></p>
                    </div>
                    <button type='button' class="p-4"
                            onclick$={() => addToCart(items.value, parseInt(qty.value, 10))}> Add To Cart
                    </button>
                    <button type='button' onclick$={() => dialog.value?.close()}> Cancel</button>
                </form>
            </dialog>
            <div className="card lg:card-side bg-base-100 shadow-xl md:flex md:auto">
                <img width="200" height="375" class="md:flex object-cover" src={imageItem(items.value)}/>
                <div className="card-body">
                    <h2 className="card-title">{items.value?.attributes.name}</h2>
                    <h4>${items.value?.attributes.price}</h4>
                    <p>{items.value?.attributes.longDescription}</p>
                    <div class="btn-group btn-group-vertical lg:btn-group-horizontal border-black ">
                        <button class="btn">-</button>
                        <button class="btn">+</button>
                        <button className="btn bg-gray-800 text-white"
                                onClick$={() => openAddToCartDialog(items.value, parseInt(qty.value, 10))}>Add to cart
                        </button>

                    </div>
                    <p className="fa-solid fa-heart text-sm font-light"> Add to wishlist</p>
                    <p><span class="font-bold">Category:</span>{items.value?.attributes.category}</p>

                </div>
            </div>

        </div>

    )

})

export const head: DocumentHead = {
    title: "Products Details",
    meta: [
        {
            name: "description",
            content: "Purchase designer clothes",
        },
    ],
};