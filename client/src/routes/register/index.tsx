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
        <div class="mt-20 ">
            <h2 class="text-center font-bold text-lg">Register/Sign In</h2>
            
            <form class="justify-center items-center content-center">

                <div class="text-center ">
               <div>
                   <span className="block text-sm font-medium text-slate-700 justify-start">Enter Email</span>
                   <input class="input input-bordered w-[300px]" placeholder="email" type="text"  bind:value={email}/></div>
               <div>
                   <span className="block text-sm font-medium text-slate-700">Enter Password</span>
                   <input class="input input-bordered w-[300px]" placeholder="password" type="password"  bind:value={password}/></div>
                   <div> <button class="bg-gray-800 text-white p-3 rounded btn w-[300px]" type="button" onClick$={handleRegister}>Continue</button></div>
                </div>
            </form>
        </div>
    )
})