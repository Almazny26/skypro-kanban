import { SkeletonCardStyled, SkeletonContent, SkeletonLine, SkeletonCategory, SkeletonDate } from "./SkeletonCard.styled";

function SkeletonCard({ delayMs = 0 }) {
  return (
    <SkeletonCardStyled $delayMs={delayMs}>
      <SkeletonContent>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <SkeletonCategory />
          <div style={{ width: "24px", height: "24px", display: "flex", gap: "2px", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#94a6be", opacity: 0.3 }}></div>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#94a6be", opacity: 0.3 }}></div>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#94a6be", opacity: 0.3 }}></div>
          </div>
        </div>
        <SkeletonLine $width="113px" $height="13px" style={{ marginBottom: "10px" }} />
        <SkeletonLine $width="58px" $height="13px" />
      </SkeletonContent>
    </SkeletonCardStyled>
  );
}

export default SkeletonCard;

