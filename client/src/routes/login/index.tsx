import {component$, useSignal,$} from "@builder.io/qwik";
import client from "~/api/feathersapi";
import {useNavigate} from "@builder.io/qwik-city";


export default component$(()=>{
    const email = useSignal("")
    const password = useSignal("")
    const navigate = useNavigate()
    const handleLogin = $(async ()=>{
        try {
            const formData = {strategy:"local", email:email.value, password:password.value};
            //submit
            await client.authenticate(formData);
            email.value=""
            password.value=""
            await navigate("/profile")
        }
        catch (e){
            console.log(e)

        }
    })

    return(
        <div class="mt-20">
            <form>
                <input type="text" placeholder="email" bind:value={email}/>
                <input type="password" placeholder="password" bind:value={password}/>
                <button class="btn" type="button" onClick$={handleLogin}>Login</button>
            </form>
        </div>
    )
})