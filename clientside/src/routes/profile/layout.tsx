import {
    $,
    component$,
    createContextId,
    Signal,
    Slot,
    useContextProvider,
    useSignal,
    useVisibleTask$
} from "@builder.io/qwik";


import {routeLoader$, useNavigate} from "@builder.io/qwik-city";
import client from "~/api/feathersapi";

export interface UserType{
    _id:string;
    name:string;
    email:string;
}

export const AuthUserContext = createContextId<Signal<UserType>>("authUser")
export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    };
});


export default component$(() => {
    const navigate = useNavigate()
    const authUser = useSignal()
    useContextProvider(AuthUserContext,authUser)

    useVisibleTask$(async () => {
        try {
            await client.reAuthenticate()
            const { user } = await client.get('authentication')
            authUser.value = user

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
                <div class="mt-20 p-10">
                    <h4>Welcome to your profile</h4>
                    <button class="btn" type="button" onClick$={handleLogout}>Log out</button>

                </div>


                <Slot/>
            </main>


        </>
    );
});
