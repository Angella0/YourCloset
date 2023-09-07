import {component$, useSignal,$} from "@builder.io/qwik";
import client from "~/api/feathersapi";
import {Link, useNavigate} from "@builder.io/qwik-city";
import Register from "~/components/register";


export default component$(()=>{


    return(

            <>
                <h2 class="text-center font-bold text-lg">Register</h2>
                <Register/>
                <Link href={"/login"}>
                    <p>Login</p>
                </Link>
            </>

    )
})