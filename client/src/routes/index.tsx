import {component$, useComputed$, useContext, useSignal, useStore} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Carousel from "~/components/carousel";
import NavBar from "~/components/navBar";
import Cards from "~/components/cards";
import Subscribe from "~/components/subscribe";
import {InputContextId, ProdContextId,QueryContextId} from "~/routes/layout";
import {imageItem} from "~/routes/imageItem";




export default component$(() => {

    const activeTab = useSignal("")
    const query = useContext(QueryContextId)

    const inputHidden =useContext(InputContextId)
    const products = useContext(ProdContextId)
    const productsData = useComputed$(() => {
        return products.filter(product => ((product.category?.name === activeTab.value) || (activeTab.value === ""))).filter((eventData) => {
            if (query.value === "") {
                return eventData;
            } else if (eventData?.name.toLowerCase().includes(query.value.toLowerCase())) {
                return eventData
            }
        }).map((prod) => {
            const category = prod.category.name;
            const prodName = prod.name;
            const prodPrice = "$" + prod.price;
            const prodImage = prod.image;
            const prodId = prod._id

            return {
                category: category,
                name: prodName,
                price: prodPrice,
                image: prodImage,
                _id: prodId
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
            name: "newArrival"
        },
        {
            label: "BEST SELLER",
            name: "bestSeller"
        },
        {
            label: "TOP RATED",
            name: "topRated"
        },
    ]);



    return(
      <>
          {inputHidden.value ? <Carousel /> : null }
          <Carousel/>
          <h1 class="text-xl text-center mt-16 mb-8"> OUR FEATURED <span class="font-bold"> PRODUCTS</span></h1>
          <div class="flex justify-center mb-8">
              <div class="tabs gap-4 text-sm">
                  {tabs.map((tab) => {
                      return (
                          <div
                              class={`cursor-pointer ${activeTab.value == tab.name ? "border-b border-black font-bold" : ""}`}
                              onClick$={() => {
                                  activeTab.value = tab.name
                              }}>{tab.label}</div>

                      )
                  })}

              </div>
          </div>
          <div class=" flex mx-auto  ">
              <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {productsData.value.map((itme) =>{
                      return(
                          <Cards {...itme} />
                      )
                  })}
              </div>
          </div>
          <Subscribe/>
          
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
