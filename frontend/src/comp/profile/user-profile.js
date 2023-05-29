import Signup from "./signup";
import Signin from "./signin";

export default function UserProfile() {
  return (
    <div>
      <div className="d-flex row gx-0">
        <div className="col-md-6 col-12">
          <Signup />
        </div>
        <div className="col-md-6 col-12">
          <Signin />
        </div>
      </div>
    </div>
  );
}
