import {component$, useSignal, useComputed$} from "@builder.io/qwik";


export default component$(() => {
    const inputName = useSignal("")
    const capitalizedName = useComputed$(() => {
        // it will automatically reexecute when name.value changes
        return inputName.value.toUpperCase();
    });

    return (

        <div class="justify-center items-center mx-auto mb-8 text-center sm:text-center">
            <i className="fa-solid fa-envelope justify-center"></i>
            <h3 class="font-bold">SUBSRCRIBE TO OUR NEWSLETTER </h3>
            <p class="text-center"> and receive $20 coupon for order when you check out</p>
            <div className="join container  justify-center items-center mx-auto my-4">
                <input className="input input-bordered join-item " bind:value={inputName}/>
                <button className="btn join-item bg-gray-800 text-white p-3 rounded"
                        onclick$={() => console.log(inputName.value)}>Subscribe
                </button>
                <br/>
            </div>
            <p>{inputName.value}</p>


        </div>


    )
});