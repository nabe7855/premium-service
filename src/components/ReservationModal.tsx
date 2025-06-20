// ReservationModal.tsx
"use client";

import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useModalStore } from "@/store/modalStore";

const ReservationModal = () => {
  const { isOpen, closeModal } = useModalStore();

  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-60" />
        <Dialog.Panel className="relative bg-white rounded-lg max-w-2xl w-full p-6 z-10 shadow-xl">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <Dialog.Title className="text-xl font-bold mb-4 text-center text-pink-700">
            ご予約フォーム
          </Dialog.Title>

          <div className="mb-6 text-center">
            <a
              href="https://line.me/R/ti/p/@example"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              💬 LINEで相談する
            </a>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block font-medium text-sm mb-1">合流時のお名前（偽名OK） <span className="text-red-500">※必須</span></label>
              <input type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">ご連絡先メールアドレス <span className="text-red-500">※必須</span></label>
              <input type="email" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">ご連絡先TEL</label>
              <input type="tel" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">ご利用希望日時</label>
              <textarea className="w-full border rounded px-3 py-2" rows={2} placeholder="例 第1希望10/5 15時 第2希望10/6 10時～17時"></textarea>
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">当店の利用状況 <span className="text-red-500">※必須</span></label>
              <select className="w-full border rounded px-3 py-2" required>
                <option value="">選択して下さい</option>
                <option>初めて</option>
                <option>2回目</option>
                <option>3回以上</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">待ち合わせの場所</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="例 新宿アルタ前、渋谷ラブホテル、鶯谷北口改札前" />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">希望コース <span className="text-red-500">※必須</span></label>
              <select className="w-full border rounded px-3 py-2" required>
                <option value="">選択して下さい</option>
                <option>60分</option>
                <option>90分</option>
                <option>120分</option>
                <option>150分</option>
                <option>180分</option>
                <option>210分</option>
                <option>初回限定 120分</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">初回の方は初回限定120分コースがとてもお得です</p>
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">ご指名は？</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="例 指名有りイチゴくん初めての指名、指名無し 30代希望 など" />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">当日の服装は？</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="例 赤いTシャツ 赤いスカート 赤い靴 など" />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">割引き申請</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="割引キャンペーン等をご利用の場合ご記入ください" />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">ご不明点など</label>
              <textarea className="w-full border rounded px-3 py-2" rows={2}></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
            >
              送信する
            </button>
            <p className="mt-4 text-sm text-red-600">
              ※ご注意点<br />
              contactsutoroberrys@gmail.com こちらのアドレスからメールが届きます。<br />
              営業時間内に1時間以上返信がない方は「迷惑メール」フォルダに振り分けられている可能性がありますのでご確認ください。<br />
              それでも確認できない場合は、お手数ですが別のメールアドレスで再度お申し込みいただくか、LINE、お電話でお問い合わせください。
            </p>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReservationModal;
