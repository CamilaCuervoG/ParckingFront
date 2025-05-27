import React from "react";
import SidebarStart from "../../components/layout/sidebar/sidebarStart/SidebarStart";
import ContactForm from "../..//components/ui/form/ContactForm/ContactForm";
import "./Contact.css"; 

const Contact = () => {
  return (
    <>
      <SidebarStart />
      <main className="contact-main" style={{ paddingTop: "80px" }}>
        <h1>Contacto</h1>
        <p>Si tienes alguna pregunta, escríbenos y te responderemos pronto.</p>
        <ContactForm />
      </main>
    </>
  );
};

export default Contact;
