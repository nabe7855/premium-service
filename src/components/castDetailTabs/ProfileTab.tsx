import React from "react";
import { marked } from "marked";

interface ProfileTabProps {
  cast: {
    name?: string;
    age?: number;
    height?: number;
    weight?: number;
    bloodtype?: string;
    SNSURL?: string;
    QA?: string; // キャストQ&A（Markdown）
    Managercomment?: string; // 店長コメント（Markdown）
    Featureintroduction?: string; // ← 追加：自己紹介（Markdown）
  };
}

const ProfileTab: React.FC<ProfileTabProps> = ({ cast }) => {
  return (
    <div className="space-y-6">
      {/* ◆PROFILE テーブル */}
      <div className="bg-pink-50 rounded-lg shadow-md overflow-hidden">
        <div className="bg-pink-100 text-pink-600 text-lg font-bold px-4 py-2 border-b border-pink-300">
          ◆PROFILE
        </div>

        <table className="w-full text-left text-sm">
          <tbody>
            <tr className="border-b border-pink-200">
              <th className="w-1/3 px-4 py-3 font-medium text-gray-700">名前</th>
              <td className="px-4 py-3 text-gray-800">{cast.name || "非公開"}</td>
            </tr>
            <tr className="border-b border-pink-200">
              <th className="px-4 py-3 font-medium text-gray-700">身長・体重</th>
              <td className="px-4 py-3 text-gray-800">
                {cast.height ?? "?"}cm・{cast.weight ?? "?"}kg
              </td>
            </tr>
            <tr className="border-b border-pink-200">
              <th className="px-4 py-3 font-medium text-gray-700">年齢</th>
              <td className="px-4 py-3 text-gray-800">
                {cast.age ? `${cast.age}歳` : "非公開"}
              </td>
            </tr>
            <tr className="border-b border-pink-200">
              <th className="px-4 py-3 font-medium text-gray-700">血液型</th>
              <td className="px-4 py-3 text-gray-800">{cast.bloodtype || "非公開"}</td>
            </tr>
            {cast.SNSURL && (
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700">SNS</th>
                <td className="px-4 py-3 text-pink-600 underline">
                  <a href={cast.SNSURL} target="_blank" rel="noopener noreferrer">
                    {cast.name}さんのSNSはこちら
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 店長メッセージ */}
      {cast.Managercomment && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-pink-200">
          <h2 className="text-lg font-bold text-pink-600 mb-2">◆COMMENT</h2>
          <h3 className="text-xl font-semibold text-gray-700 border-b border-pink-300 pb-2 mb-4">
            店長メッセージ
          </h3>
          <div
            className="prose prose-pink max-w-none text-base leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: marked(cast.Managercomment) }}
          />

        </div>
        
      )}


      {/* キャストQ&A */}
      {cast.QA && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-pink-200">
          <h2 className="text-lg font-bold text-pink-600 mb-4">📝 キャストQ&A</h2>
          <div
            className="prose prose-pink max-w-none text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: marked(cast.QA) }}
          />
        </div>
      )}



                {/* ← ここに自己紹介挿入 */}
          {cast.Featureintroduction && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-pink-200">
              <h2 className="text-lg font-bold text-pink-600 mb-4">🌟 自己紹介</h2>
              <div
                className="prose prose-pink max-w-none text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: marked(cast.Featureintroduction) }}
              />
            </div>
          )}
    </div>
  );
};

export default ProfileTab;
