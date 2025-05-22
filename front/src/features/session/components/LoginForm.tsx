export function LoginForm() {
  return(
    <>
      <fieldset className="fieldset rounded-box w-full p-4">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input w-full" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input w-full" placeholder="Password" />

        <button className="btn btn-success mt-4">Login</button>
      </fieldset>
    </>
  )
}
