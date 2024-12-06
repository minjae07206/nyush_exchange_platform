export default function HomePage() {
    return (
        <div className="h-[900px] pt-4 min-w-[280px] pb-12 bg-violet-100">
            <div className="h-[300px] flex justify-center p-10">
                <img
                    src={`${process.env.PUBLIC_URL}/logo2.png`}
                    alt="Logo"
                    className="h-50 w-auto" // Example styles; adjust as needed
                />
                <div className="mt-16 mr-4">
                    <h1 className="text-2xl md:text-5xl font-extrabold">Second Life</h1>
                    <h3 className="text-xs larger-phones:text-sm md:text-xl">Give your used items a second life! Sell and buy second hand items</h3>
                </div>
            </div>
            <div className="h-[300px] bg-violet-200">
                <h1 className="mx-20 pt-16 text-2xl md:text-5xl font-extrabold">Know who you buy from</h1>
                <h3 className="mx-20 pt-16 text-sm larger-phones:text-sm md:text-xl">Can only be accessed within the NYU network or VPN, requires a NYU email to create an account. So you can guarantee that everyone is a part of the NYU Shanghai community, reducing the likelyhood of scams.</h3>
            </div>
            <div className="h-[300px] bg-violet-100">
                <h1 className="mx-20 pt-16 text-2xl md:text-5xl font-extrabold">Share what you choose</h1>
                <h3 className="mx-20 pt-16 text-sm larger-phones:text-sm md:text-xl">At first, only your email will be shared to others. Adding the wechat QR code is optional, and can be done in settings. It can also be removed any time!</h3>
            </div>
        </div>
    )
}