import {component$, useComputed$, useContext, useSignal, useStore} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Carousel from "~/components/carousel";
import Cards from "~/components/cards";
import Subscribe from "~/components/subscribe";
import {InputContextId, ProductsContextId, QueryContextId} from "~/routes/layout";
import {imageItem} from "~/routes/imageItem";




export default component$(() => {
    const query = useContext(QueryContextId)
    const inputHidden =useContext(InputContextId)
    const activeTab = useSignal("")
    const item = useContext(ProductsContextId)
    const itemprod = useComputed$(()=>{
        return item.filter(itm=>((itm.attributes.category===activeTab.value) || (activeTab.value===""))).filter((itme) => {
            const searchProd = itme.attributes.name?.toLowerCase().search(query.value?.toLowerCase())
            return searchProd !== -1
        }).map((itm) =>{
            const id = itm.id;
            const category = itm.attributes.category;
            const itemName = itm.attributes.name;
            const itemPrice = "$"+itm.attributes.price;
            const itemImage = imageItem(itm);

            return {
                id: id,
                tag: category,
                name: itemName,
                price: itemPrice,
                image: itemImage
            }
        })

    })

    const tabs = useStore([

        {
            label: "All",
            name: ""
        },
        {
            label: "NEW ARRIVAL",
            name: "newArrivals"
        },
        {
            label: "BEST SELLER",
            name: "bestSellers"
        },
        {
            label: "TOP RATED",
            name: "topRated"
        },
    ]);


  return(
      <>
          {inputHidden.value ? <Carousel /> : null }


          <div>
              <h1 class="text-xl text-center mt-16 mb-8"> OUR FEATURED <span class="font-bold"> PRODUCTS</span></h1>
              <div class="flex justify-center mb-8">
                  <div class="tabs gap-4 text-sm">
                      {tabs.map((tab) =>{
                          return(
                             <div class={`cursor-pointer ${activeTab.value==tab.name ? "border-b border-black font-bold" : ""}`} onClick$={() =>{
                                 activeTab.value=tab.name
                             }}>{tab.label}</div>

                          )
                      })}

                  </div>
              </div>
          </div>
          <div class=" flex mx-auto  ">
              <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {itemprod.value.map((itme) =>{
              return(
                  <Cards {...itme} />
              )
          })}
              </div>
          </div>
          <Subscribe />

          
      </>
  )


})





export const head: DocumentHead = {
  title: "Shopify",
  meta: [
    {
      name: "description",
      content: "Purchase designer clothes",
    },
  ],
};
