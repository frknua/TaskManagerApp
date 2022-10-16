
import { useState } from 'react';

const Login = (props: any) => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

  return (
    <div className="Auth-form-container">
      <form className="Auth-form"
      onSubmit={e => {
        e.preventDefault();
        props.login(email, password);
    }} >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={!email || !password}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Login;