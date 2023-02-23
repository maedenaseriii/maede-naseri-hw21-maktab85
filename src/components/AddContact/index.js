import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddPost = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [relative, setRelative] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email ? contact : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone ? contact : null
    );

    // if (!email || !name || !phone || !family || !relative) {
    //   return toast.warning("Please fill in all fields!!");
    // }
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
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      email,
      name,
      phone,
      family,
      relative,
    };

    addContact(data);
    toast.success("Contact added successfully!!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-6">Add Post</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="family"
                value={family}
                onChange={(e) => setFamily(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="relative"
                value={relative}
                onChange={(e) => setRelative(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add contact"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
