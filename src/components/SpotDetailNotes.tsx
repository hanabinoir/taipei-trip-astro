import type { Spot } from "../data/spots";
import "./SpotDetailNotes.css";

interface Props {
  spot: Spot;
}

export default function SpotDetailNotes({ spot }: Props) {
  const renderNotes = () => {
    switch (spot.slug) {
      case "banka-longshan-temple":
        return (
          <div className="notes-etymology">
            <h3>名称由来</h3>
            <ul>
              <li><span className="label">ケタガラン語：</span>丸木舟 / Mankah</li>
              <li><span className="label">台湾語：</span>バンカ / Báng-kah</li>
              <li><span className="label">漢字：</span>万華（ばんか・まんか）</li>
            </ul>
          </div>
        );
      case "presidential-office":
        return (
          <div className="notes-visit-info">
            <h3>観光情報</h3>
            <ul>
              <li>平日や一部の休日に観光客が訪れることができます。</li>
              <li>日程は公式サイトで確認してください。</li>
            </ul>
            <a href="https://www.english.president.gov.tw/Page/124" target="_blank" rel="noopener noreferrer" className="external-link">
              観光日程 (英語)
            </a>
          </div>
        );
      case "xinzhuang-tfai":
        return (
          <div className="notes-visit-info">
            <h3>案内</h3>
            <a href="https://www.tfai.org.tw/en/front/index" target="_blank" rel="noopener noreferrer" className="external-link">
              公式サイト（英語）
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="spot-detail-notes">
      {renderNotes()}
    </div>
  );
}
