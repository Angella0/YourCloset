import {component$, useSignal,$} from "@builder.io/qwik";
import client from "~/api/feathersapi";
import {useNavigate} from "@builder.io/qwik-city";


export default component$(()=>{
    const email = useSignal("")
    const password = useSignal("")
    const navigate = useNavigate()
    const handleRegister = $(async ()=>{
        try {
          const formData = {email:email.value,password:password.value};
          //submit
            await client.service("users").create(formData);
            await client.authenticate({...formData,strategy:"local"});
            email.value="";
            password.value="";
            await navigate("/profile")
        }
        catch (e){
            console.log(e);
        }

    })

    return(
        <div class="mt-20">
            <form>
                <input placeholder="email" type="text"  bind:value={email}/>
                <input placeholder="password" type="password"  bind:value={password}/>
                <button type="button" onClick$={handleRegister}>Register</button>
            </form>
        </div>
    )
})