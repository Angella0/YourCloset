import {$, component$, Slot, useVisibleTask$} from "@builder.io/qwik";


import {routeLoader$, useNavigate} from "@builder.io/qwik-city";
import client from "~/api/feathersapi";


export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    };
});


export default component$(() => {

    useVisibleTask$(async () => {
        try {
            const x = await client.reAuthenticate()
        } catch (e) {
            console.log(e)
        }
    })


    const navigate = useNavigate()
    const handleLogout = $(async () => {
        try {
            await client.logout()
            await navigate("/login")
        } catch (e) {
            console.log(e)
        }
    })
    return (
        <>

            <main class="flex-1 flex flex-col min-b-screen">
                <div className="mt-20">
                    <button class="btn" type="button" onClick$={handleLogout}>Log out</button>

                </div>


                <Slot/>
            </main>


        </>
    );
});
