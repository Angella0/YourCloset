import {component$, useComputed$, useContext, useSignal} from "@builder.io/qwik";
import {InputContextId, ProdContextId, QueryContextId} from "~/routes/layout";
import {imageItem} from "~/routes/imageItem";
import Carousel from "~/components/carousel";
import Cards from "~/components/cards";
import Subscribe from "~/components/subscribe";

export default component$(() =>{

    const products = useContext(ProdContextId);

    return(
        <div class="mt-40">
            {JSON.stringify(products)}
        {/*    // @ts-ignore*/}
        {/*    const query = useContext(QueryContextId)*/}
        {/*    // @ts-ignore*/}
        {/*    const inputHidden =useContext(InputContextId)*/}
        {/*    const activeTab = useSignal("")*/}
        {/*    // @ts-ignore*/}
        {/*    const item = useContext(ProdContextId)*/}
        {/*    const itemprod = useComputed$(()=>{*/}
        {/*    // @ts-ignore*/}
        {/*    return item.value.filter(itm=>((itm.attributes.category===activeTab.value) || (activeTab.value===""))).filter((itme) => {*/}
        {/*    // @ts-ignore*/}
        {/*    const searchProd = itme.name?.toLowerCase().search(query.value?.toLowerCase())*/}
        {/*    return searchProd !== -1*/}
        {/*}).map((itm: { id: any; attributes: { category: string; name: string; price: string; }; }) =>{*/}
        {/*    const id = itm.id;*/}
        {/*    const category = itm.attributes.category;*/}
        {/*    const itemName = itm.attributes.name;*/}
        {/*    const itemPrice = "$"+itm.attributes.price;*/}
        {/*    const itemImage = imageItem(itm);*/}

        {/*    return {*/}
        {/*    id: id,*/}
        {/*    tag: category,*/}
        {/*    name: itemName,*/}
        {/*    price: itemPrice,*/}
        {/*    image: itemImage*/}
        {/*}*/}
        {/*})*/}

        {/*})*/}
        {/*    {inputHidden.value ? <Carousel /> : null }*/}


        {/*    <div>*/}
        {/*        <h1 class="text-xl text-center mt-16 mb-8"> OUR FEATURED <span class="font-bold"> PRODUCTS</span></h1>*/}
        {/*        <div class="flex justify-center mb-8">*/}
        {/*            <div class="tabs gap-4 text-sm">*/}
        {/*                {tabs.map((tab) =>{*/}
        {/*                    return(*/}
        {/*                        <div class={`cursor-pointer ${activeTab.value==tab.name ? "border-b border-black font-bold" : ""}`} onClick$={() =>{*/}
        {/*                            activeTab.value=tab.name*/}
        {/*                        }}>{tab.label}</div>*/}

        {/*                    )*/}
        {/*                })}*/}

        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div class=" flex mx-auto  ">*/}
        {/*        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">*/}
        {/*            {itemprod.value.map((itme) =>{*/}
        {/*                return(*/}
        {/*                    <Cards {...itme} />*/}
        {/*                )*/}
        {/*            })}*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <Subscribe />*/}

        </div>
    )
})