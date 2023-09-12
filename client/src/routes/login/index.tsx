import {component$,} from "@builder.io/qwik";
import client from "~/api/feathersapi";
import {useNavigate,Link} from "@builder.io/qwik-city";
import Login from "~/components/login";


export default component$(()=>{

    return(
        <div>
            <Login/>
            <p class="mt-0 text-center text-sm text-gray-500">
                Not a member?
                <a href="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</a>
            </p>




        </div>
    )
})