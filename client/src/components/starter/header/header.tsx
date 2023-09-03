import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";

export default component$(() => {
  return (
   <header class="fixed top-0 left-0 w-full flex justify-between items-center p-4">
     <h1> ECOMMERCE </h1>
     <div>
       <i class="fa-solid fa-cart-shopping"></i>
     </div>

   </header>
  );
});
