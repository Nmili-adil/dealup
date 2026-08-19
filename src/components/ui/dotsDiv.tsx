'use client'


function DotsDiv() {
    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute end-0 top-16 -z-10 hidden size-72 opacity-60 bg-[radial-gradient(var(--color-brand-dark)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_at_center,#000_20%,transparent_70%)] lg:block"
            />
        </>
    )
}


export default DotsDiv;