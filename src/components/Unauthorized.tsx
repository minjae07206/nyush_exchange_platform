export default function Unauthorized() {
    const commonClassName = 'm-auto mt-5 text-md'
    return (<div className={commonClassName}>
        <h1>You are unauthorized to enter this page.</h1>
        <p>Your session might not exist anymore, start over from signup.</p>
        <p>The post that you are trying to access might not exist anymore.</p>
    </div>)
}