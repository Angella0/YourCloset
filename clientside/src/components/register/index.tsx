import {component$, useSignal,$} from "@builder.io/qwik";
import client from "~/api/feathersapi";
import {useNavigate} from "@builder.io/qwik-city";
import {isServer} from "@builder.io/qwik/build";


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
            if(!isServer){
                await navigate("/profile")
            }
        }
        catch (e){
            console.log(e);
        }

    })

    return(
        <>
            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up
                        to your account</h2>
                </div>
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form class="space-y-6" action="#" method="POST">
                        <div>
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                address</label>
                            <div class="mt-2">
                                <input bind:value={email} id="email" name="email" type="email"
                                       required
                                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label for="password"
                                       class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div class="text-sm">
                                    <a href="#" class="font-semibold text-gray-800 hover:text-indigo-500">Forgot
                                        password?</a>
                                </div>
                            </div>
                            <div class="mt-2">
                                <input bind:value={password} id="password" name="password" type="password"
                                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <button type="button"
                                    class="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700" onClick$={handleRegister}>Register
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </>

    )
})