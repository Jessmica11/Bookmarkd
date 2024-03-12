import React from 'react';

// Define FooterButtonsDarkExample component
export default function FooterButtonsDarkExample() {
    return (
        <footer className="bg-neutral-900 text-center text-white">
            <div className="container px-6 pt-6 mx-auto">
                <div className="mb-6 flex justify-center w-full">
                    {/* Add your footer buttons here */}
                </div>
            </div>

            {/* Add your copyright section */}
            <div className="p-2 text-center bg-black bg-opacity-20">
                ©2024 
                <a className="text-white" href="https://tw-elements.com/"> Bookmark'd</a>
            </div>
        </footer>
    );
}
