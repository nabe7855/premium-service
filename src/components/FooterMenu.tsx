import Link from "next/link";
import { Phone, Calendar, DollarSign } from "lucide-react"; // Yen → DollarSign に変更

// LINEアイコン（SVG）
const LineIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 36 36"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.001 3C9.715 3 3 8.723 3 15.472c0 3.925 2.311 7.413 5.902 9.708-.258.958-1.682 6.247-1.729 6.48 0 0-.033.279.146.386.18.106.41.07.41.07.54-.075 6.303-4.142 7.093-4.674.974.14 1.975.213 3.179.213 8.286 0 15-5.723 15-12.472C33 8.723 26.287 3 18.001 3z" fill="white" />
    <path d="M12.057 15.29H10.28v4.062c0 .196-.16.355-.355.355h-.955a.355.355 0 01-.355-.355v-9.064c0-.196.159-.355.355-.355h3.09c1.52 0 2.497 1.013 2.497 2.502 0 1.487-.977 2.5-2.5 2.5zm-.161-3.423h-1.615v2.044h1.612c.708 0 1.086-.395 1.086-1.022 0-.626-.378-1.022-1.083-1.022zm7.376 4.626a.355.355 0 01-.355.355h-.985a.355.355 0 01-.355-.355v-9.064c0-.196.159-.355.355-.355h.985c.196 0 .355.159.355.355v9.064zm6.58.29h-.932a.708.708 0 01-.593-.317l-2.104-3.065v3.027a.355.355 0 01-.355.355h-.955a.355.355 0 01-.355-.355v-9.064c0-.196.16-.355.355-.355h.955c.196 0 .355.159.355.355v3.01l2.07-2.96a.733.733 0 01.602-.31h.92a.347.347 0 01.286.553l-2.3 3.185 2.392 3.35a.347.347 0 01-.294.546zm3.732 0h-.955a.355.355 0 01-.355-.355v-9.064c0-.196.159-.355.355-.355h.955c.196 0 .355.159.355.355v9.064a.355.355 0 01-.355.355z" fill="#00c300" />
  </svg>
);

export default function FooterMenu() {
  return (
    <div className="fixed bottom-0 w-full flex justify-between bg-black text-white text-xs z-50">
      <Link
        href="tel:1234567890"
        className="flex-1 flex flex-col items-center justify-center bg-red-700 py-2"
      >
        <Phone size={20} />
        <span>TEL</span>
      </Link>
      <Link
        href="/schedule"
        className="flex-1 flex flex-col items-center justify-center bg-[#4b2e1e] py-2"
      >
        <Calendar size={20} />
        <span>出勤スケジュール</span>
      </Link>
      <Link
        href="https://line.me/R/..."
        className="flex-1 flex flex-col items-center justify-center bg-green-700 py-2"
      >
        <LineIcon />
        <span>LINE予約はこちら</span>
      </Link>
      <Link
        href="/price"
        className="flex-1 flex flex-col items-center justify-center bg-neutral-900 py-2"
      >
        <DollarSign size={20} />
        <span>ご利用料金</span>
      </Link>
    </div>
  );
}
