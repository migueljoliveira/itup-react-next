"use client";
import { useState } from "react";

import "./ContactForm.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const isFormValid = Boolean(form.name && form.email && form.message);
  const isEmailValid = form.email.includes("@");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isFormValid || !isEmailValid) {
      return;
    }

    // TODO: handle form submission
console.log(form);


  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      
     <div className="form-preview">
      <p>Name: {form.name}</p>
      <p>Email: {form.email}</p>
      <p>Message: {form.message}</p>
    </div>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your name"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your email"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your message"
      />
      <button type="submit" disabled={!isFormValid || !isEmailValid}>
        Send
      </button>
      {!isFormValid && <p className="form-error">Please fill out all fields.</p>}
      {isFormValid && !isEmailValid && (
        <p className="form-error">Please enter a valid email address.</p>
      )}
    </form>
  );
}
