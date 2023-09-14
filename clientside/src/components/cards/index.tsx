import {component$, useComputed$, useContext} from "@builder.io/qwik";
import {ProductsContextId} from "~/routes/layout";
import {Link} from "@builder.io/qwik-city";
import {imageItem} from "~/routes/imageItem";

export interface ItemProps {
    id: number;
    image: string;
    tag: string;
    name: string;
    price: string

}

export default component$<ItemProps>((props) => {

    return(
      <div>
                  <Link href={`/productDetails/${props.id}`}>
                  <div class="gap-2 mb-4 justify-center my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"
                       x-for="(post, index) in posts">
                      <img width="200" height="375" class="rounded-t h-72 w-full object-cover" src={props.image}/>
                      <div>
                          <p>{props.tag}</p>
                      </div>
                      <div class="text-sm">
                          <p>{props.name}</p>
                      </div>
                      <div class="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
                          <p>{props.price}</p>
                      </div>
                  </div>
                  </Link>



      </div>
    )



})