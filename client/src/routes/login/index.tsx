import {component$,} from "@builder.io/qwik";
import client from "~/api/feathersapi";
import {useNavigate,Link} from "@builder.io/qwik-city";
import Login from "~/components/login";


export default component$(()=>{

    return(
        <div>
            <h2 class="text-center font-bold text-lg">Login</h2>
            <Login/>
            <Link href={"/register"}>
                <p>Register</p>
            </Link>

        </div>
    )
})