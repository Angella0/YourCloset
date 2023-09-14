import {component$, useContext} from "@builder.io/qwik";
import {ProductsContextId} from "~/routes/layout";

export default component$(()=>{
    const items = useContext(ProductsContextId)
    return(
        <div class="mt-20 p-10">
            {JSON.stringify(items)}
        </div>
    )
})