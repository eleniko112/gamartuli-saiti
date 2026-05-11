import React, { useState } from 'react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';

export const ContactSabotage: React.FC = () => {
  const { level, addInteraction } = useChaos();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    addInteraction();

    if (level === ProgressionLevel.STABLE || level === ProgressionLevel.SUSPICIOUS) {
      setMessage(val);
      return;
    }

    // Sabotage: delete every 10th character or random chance
    if (Math.random() > 0.85) {
      setMessage(val.slice(0, -1));
    } else {
      setMessage(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInteraction();
    const MESSAGES = [
      'შეცდომა 0x999: სერვერი გაიქცა და არ ბრუნდება.',
      'თქვენი წერილი დაიკარგა ინტერნეტის უსასრულო ოკეანეში. გმადლობთ.',
      'არ შემიძლია ამის წაკითხვა, ძალიან ბევრი შეცდომა გაქვთ ცხოვრებაში.',
      'სისტემა უარს ამბობს თქვენთან კომუნიკაციაზე.',
    ];
    alert(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-4 border-black p-6 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
      <div>
        <label className="block font-bold mb-1">სახელი</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => { addInteraction(); setName(e.target.value); }}
          className="w-full border-2 border-black p-2 focus:outline-none focus:bg-yellow-50"
          placeholder="ვინ ხარ?"
        />
      </div>
      <div>
        <label className="block font-bold mb-1">ელ-ფოსტა</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => { addInteraction(); setEmail(e.target.value); }}
          className="w-full border-2 border-black p-2 focus:outline-none focus:bg-blue-50"
          placeholder="კარიერისთვის წაგებული ელ-ფოსტა"
        />
      </div>
      <div>
        <label className="block font-bold mb-1">შეტყობინება</label>
        <textarea 
          value={message}
          onChange={handleMessageChange}
          rows={4}
          className="w-full border-2 border-black p-2 focus:outline-none focus:bg-red-50 resize-none"
          placeholder="დაწერე რამე, ოღონდ არ ვიცი თუ დარჩება..."
        />
      </div>
      <button 
        type="submit"
        className="w-full py-3 bg-black text-white font-bold uppercase transition-transform hover:scale-105 active:scale-95"
      >
        გაგზავნა (ალბათ)
      </button>
    </form>
  );
};
