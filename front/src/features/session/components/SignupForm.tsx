export function SignupForm() {
  return(
    <>
      <fieldset className="fieldset rounded-box w-full p-4">
        <legend className="fieldset-legend text-2xl">Signup</legend>

        <label className="label">Name</label>
        <input type="text" className="input w-full" placeholder="Name" />

        <label className="label">Email</label>
        <input type="email" className="input w-full" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input w-full" placeholder="Password" />

        <label className="label">PasswordConfirmation</label>
        <input type="password" className="input w-full" placeholder="PasswordConfirmation" />

        <button className="btn btn-info mt-4">Signup</button>
      </fieldset>
    </>
  )
}