function ContactUs({ userMessage, handleSubmit, handleInputChange }) {
  return (
    <div className="contactform">
      <h1
        style={{
         
          justifyContent: "center",
          padding: "10px",
        }}
      >
        Contact Starbucks Admin
      </h1>
      <h2>
        In case of any enquiry, contact us, and we will look into your message
        shortly.
      </h2>
      <p>
        Also, you can give feedback on how efficient and interactive our website
        is.
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            class="form-control"
            value={userMessage.name}
            placeholder="Enter full name e.g., John Doe"
            required
            onChange={handleInputChange}
          />
          <br />
          <input
            name="email"
            type="email"
            class="form-control"
            value={userMessage.email}
            placeholder="Enter email e.g., johnd@gmail.com"
            required
            onChange={handleInputChange}
          />
          <br />
          <textarea
            rows="4"
            cols="70"
            name="message"
            type="text"
            class="form-control"
            value={userMessage.message}
            placeholder="Write us a message or feedback"
            required
            onChange={handleInputChange}
          ></textarea>
          <br />
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <strong>THANK YOU FOR YOUR FEEDBACK</strong>
      <hr />
      <div className="starbucks-info">
        <div>
          <strong>Our Location</strong>
          <br />
          <p>we are located at Nairobi , Kenya </p>
          <br />
          <strong>Contact Us </strong>
          <p>You can email us at : starbuckscoffeshop@gmail.com</p>
        </div>
        <div>
          <p> phone : 0712345678 or 0787654321 </p>
          <br />
          <strong>Love is in the air, and it smells like coffee</strong>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
