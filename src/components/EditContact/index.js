import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setFamily(currentContact.family)
    setEmail(currentContact.email);
    setPhone(currentContact.phone);
    setRelative(currentContact.relative)
   
  }, [currentContact]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [family, setFamily] = useState("");
  const [relative, setRelative] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (!email || !name || !phone || !family || !relative) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }
    if (name.trim() === "" || name.length <= 3 || !name.match(/^[a-zA-Z]*$/)) {
      return toast.error("Please enter valid name!!");
    }
    if (
      family.trim() === "" ||
      family.length <= 3 ||
      !family.match(/^[a-zA-Z]*$/)
    ) {
      return toast.error("Please enter valid family!!");
    }
    if (
      email.trim() === "" ||
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ) {
      return toast.error("Please enter valid email!!");
    }


    if (phone.trim() === "" || phone.length !== 11 || !phone.match(/^09/)) {
      return toast.error("Please enter phone email!!");
    }


    const data = {
      id: currentContact.id,
      email,
      name,
      phone,
      family,
      relative
    };

    updateContact(data);
    toast.success("Contact updated successfully!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-2"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={family}
                  placeholder={"family"}
                  onChange={(e) => setFamily(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={phone}
                  placeholder={"Phone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={relative}
                  placeholder={"relative"}
                  onChange={(e) => setRelative(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
