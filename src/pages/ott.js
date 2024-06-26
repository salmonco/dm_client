import axiosInstance from "@api/axiosInstance";
import BottomTabNav from "@components/bottomTabNav";
import OttItem from "@components/ottItem";
import { useEffect, useState } from "react";
import DramaRecommItem from "@components/dramaRecommItem";
import Image from "next/image";
import { useRouter } from "next/router";
import OttRecomm from "@components/ottRecomm";

export const MAX_SELECT_CNT = 3;
export const OTT_DATA = [
  {
    ott_image: "",
    price: "5900",
    // ott가 소유하고 있는 드라마 제목만 반환
    dramas: "drama1 title, drama2 title",
  },
];

export default function Ott() {
  const [loading, setLoading] = useState(false);
  const [dramaList, setDramaList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const getDramaLike = async () => {
    try {
      setLoading(true);
      // const res = await axiosInstance.get(`/api/api/v1/drama/like`);
      const res = await fetch(`/api/api/v1/drama/like`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(`drama like`, res);
      const json = await res.json();
      setDramaList(json);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const putOTTData = async () => {
    try {
      const res = await fetch(`/api/api/v1/ott`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`put ott`, res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // putOTTData();
    getDramaLike();
  }, []);

  return (
    <div className="overflow-y-auto flex flex-col gap-[16px] px-[16px] pt-[20px] pb-[80px]">
      <span>
        현재 {selectedIds.length}개 선택 / {MAX_SELECT_CNT}
      </span>
      <div className={`w-full flex justify-center`}>
        {loading && (
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand"></div>
        )}
      </div>
      {dramaList.length ? (
        <div className="grid grid-cols-3 justify-items-center gap-y-[16px]">
          {dramaList.map((v) => (
            <DramaRecommItem
              key={v.dramaId}
              item={v}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          ))}
        </div>
      ) : (
        <div className="pt-[20px] flex justify-center items-center">
          <p className="leading-[3rem] text-[1.4rem] text-[#7F828C] text-center">
            아직 찜한 드라마가 없습니다.
          </p>
        </div>
      )}
      <button
        className="w-full bg-brand h-[43px] rounded-[10px] flex gap-[8px] items-center justify-center disabled:bg-slate-300 shrink-0"
        onClick={() => setIsShowModal(true)}
        disabled={selectedIds.length < MAX_SELECT_CNT}
      >
        <Image
          alt=""
          src={require("@images/recomm-white.svg")}
          width={20}
          height={20}
          priority
        />
        <span className="text-white font-sb">OTT 추천받기</span>
      </button>

      {isShowModal && (
        <div className="absolute bottom-0 left-0 w-full h-full z-20">
          <OttRecomm
            dramaId1={selectedIds[0]}
            dramaId2={selectedIds[1]}
            dramaId3={selectedIds[2]}
            setIsShowModal={setIsShowModal}
          />
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
