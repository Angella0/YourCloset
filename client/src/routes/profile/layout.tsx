import {$, component$, Slot, useVisibleTask$} from "@builder.io/qwik";


import {routeLoader$, useNavigate} from "@builder.io/qwik-city";
import client from "~/api/feathersapi";


export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    };
});


export default component$(() => {
    const navigate = useNavigate()

    useVisibleTask$(async () => {
        try {
            const x = await client.reAuthenticate()
        } catch (e) {
            await navigate("/login")
            console.log(e)
        }
    })



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
                    <h4>Welcome to your profile</h4>
                    <button class="btn" type="button" onClick$={handleLogout}>Log out</button>

                </div>


                <Slot/>
            </main>


        </>
    );
});
