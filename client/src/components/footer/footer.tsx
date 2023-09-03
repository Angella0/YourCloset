import {component$} from "@builder.io/qwik";

export default component$(() =>{
    return(
        <footer className="footer p-10 bg-base-200 text-base-content">
            <div>
                <h1 className="text-red-800 font-bold">ECOMMERCE</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit nunc mattis,<br/> cubilia laoreet condimentum egestas lacus duis scelerisque diam,<br/> dis venenatis nulla curae massa ad leo pulvinar. </p>

            </div>
            <div>
                <span className="footer-title font-bold ">About Us</span>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </div>
            <div>
                <span className="footer-title font-bold text-black">Customer Care</span>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </div>
            <div>
                <span className="footer-title font-bold text-black">Contact Us</span>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </div>
        </footer>
    )
})