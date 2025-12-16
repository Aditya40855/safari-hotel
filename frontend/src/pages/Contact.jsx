import React, { useState } from "react";

export default function Contact() {
  const [name,setName]=useState(''); const [msg,setMsg]=useState('');
  const handleSubmit = (e) => { e.preventDefault(); alert('Thanks! (demo)'); }
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full p-2 border rounded" />
        <textarea required value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Message" className="w-full p-2 border rounded" rows="6" />
        <button className="bg-orange-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}
