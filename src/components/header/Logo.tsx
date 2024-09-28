interface LogoProps {
    className?: string; // Optional prop
}

export default function Logo ({className}:LogoProps): JSX.Element {
    return <div className={className}>Logo</div>
}