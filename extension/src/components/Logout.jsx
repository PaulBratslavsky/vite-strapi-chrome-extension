
export default function Logout({ onClick }) {
  return (
    <div className="container px-4 mx-auto">
      <div className="max-w-sm mx-auto">
        <p>You are already logged in</p>
        <button className="btn btn-primary" onClick={onClick}>
          Logout
        </button>
      </div>
    </div>
  );
}