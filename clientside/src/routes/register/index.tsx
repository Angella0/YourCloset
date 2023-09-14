import {component$, useSignal,$} from "@builder.io/qwik";
import client from "~/api/feathersapi";
import {Link, useNavigate} from "@builder.io/qwik-city";
import Register from "~/components/register";


export default component$(()=>{


    return(

        <>

            <Register/>
            <p class="mt-0 text-center text-sm text-gray-500">
                Already a member?
                <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</a>
            </p>
        </>

    )
})