// src/components/Button.tsx

import React from 'react';

interface ButtonProps {
  children: React.ReactNode; // ボタンの中に表示する文字やアイコン
  onClick?: () => void;       // ボタンがクリックされたときの動作
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full max-w-xs h-[56px] rounded-xl text-white text-lg font-bold
        bg-gradient-to-r from-strawberry-primary to-pink-400
        shadow-[0_4px_12px_rgba(255,20,147,0.3)]
        transition-transform duration-100 active:scale-95
      "
    >
      {children}
    </button>
  );
};

export default Button;
