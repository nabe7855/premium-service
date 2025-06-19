"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((o) => !o);

  const navItems = [
    { label: "ご案内", href: "#" },
    { label: "セラピスト一覧", href: "/" },
    { label: "出勤スケジュール", href: "#" },
    { label: "口コミ", href: "#" },
    { label: "写メ日記", href: "#" },
    { label: "動画", href: "#" },
    { label: "求人募集", href: "#" },
    { label: "お問合わせ", href: "#" },
    { label: "ご予約", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-pink-100 shadow-md">
      {/* 上段：ロゴ＋電話番号 */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-2 gap-1 md:gap-0">
        <div className="text-sm text-gray-700 md:hidden">
          東京都23区｜女性専用風俗｜出張性感マッサージ
        </div>
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="text-xl font-bold text-pink-700">🍓ストロベリーボーイズ</div>
          {/* ハンバーガーアイコン（スマホのみ） */}
          <button
            className="md:hidden text-pink-700"
            onClick={toggleMenu}
            aria-label="メニューを開く"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <div className="hidden md:block text-pink-600 text-lg font-bold">
          📞 050-5212-5818
        </div>
      </div>

      {/* PC用メニュー */}
      <nav className="hidden md:flex justify-center bg-pink-200 text-pink-800 font-semibold text-sm">
        {navItems.map((item, i) => (
          <a key={i} href={item.href} className="px-4 py-2 hover:bg-pink-300">
            {item.label}
          </a>
        ))}
      </nav>

      {/* モバイルメニュー（Framer Motion でスライド） */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="fixed top-0 left-0 h-full w-1/2 bg-pink-50 z-40 p-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4 text-pink-700 font-semibold text-base">
              {navItems.map((item, i) => (
                <a key={i} href={item.href} onClick={toggleMenu}>
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-6 text-right text-pink-600 font-bold">
              📞 050-5212-5818
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
