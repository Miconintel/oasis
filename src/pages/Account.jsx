import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Account() {
  return (
    <>
      <Row>
        <Heading as="h3">Update user Data</Heading>
        <UpdateUserDataForm />
      </Row>
      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
