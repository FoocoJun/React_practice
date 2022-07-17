import React from "react";

import Feed from "./Feed";
import ScrollTopBtn from "./btns/ScrollTopBtn";

const FeedBox = () => {
  let [post,setPost] =React.useState( [
    {
      writer: "Chanho",
      writerPic:
        "https://w.namu.la/s/91ecc2d3b3958b2c92e8706b1d3b9a12fdcd882b80b9ef1861c46e3918065a813320087f3bce2246cd93fc55b5e8d72f634b37251451bfa64c04286b2f330aa00c7891cc1bdd1ac3f06918db96155116151c149b45c4b6306e4af4590df931ff791505cca4e38577540f04a9f7855d0d",
      date: "2022-2-7 16:00",
      layout: 0,
      img: "https://www.discoverlosangeles.com/sites/default/files/media/Activities/dodger-stadium-sunset-1.jpg?width=2600&fit=bound&quality=72&auto=webp",
      loc: "LA 다저 스타디움",
      story:
        "제가 LA에 있을때는 말이죠 정말 제가 꿈에 무대인 메이저리그로 진출해서 가는 식당마다 싸인해달라 기자들은 항상 붙어다니며 취재하고 제가 그 머~ 어~ 대통령이 된 기분이였어요 그런데 17일만에 17일만에 마이너리그로 떨어졌어요 못던져서 그만두고 그냥 확 한국으로 가버리고 싶었어요 그래서 집에 가는길에 그 맥주6개 달린거 있잖아요 맥주6개 그걸 사가지고 집으로 갔어요 그전에는 술먹으면 야구 못하는줄 알았어요 그냥 한국으로 가버릴려구.... 그리고 맥주 6개먹고 확 죽어버릴려고 그랬어요 야구 못하게 되니깐 그러나 집에가서 일단은 부모님에게 전화를 해야겠다고 생각을 했어요 다음날 가려고 전화를 딱 했는데 어머니께서 찬호야 어후~ 찬호야 아들 잘있어 밥은 먹고 다니는겨~ 잘지내는겨 대뜸 그러시는 거에요 내가 말도 하기도 전해 그래서 저는 야구좀 안되지만 잘하고 있다고 여기사람들 잘챙겨준다고 라고 거짓말을  했어요 한국은 못가게 됬지 내일 야구장은 가야하지 막막하더라구요 그럼 어떻게 가야하나 생각을 했어요....(후략)",
    },
    {
      writer: "Hajun",
      writerPic:
        "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/33348141_2029080354019391_8693798106786955264_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZqAAuqEoHEcAX8oicAG&_nc_oc=AQk0omR4N2AcSjVCXiPFh6p1lMLv24xoGErgZ5IrEWh0xF_wJ_ar7O-cN6Fvv0SI5I8&tn=80rR6QnwQZXm_AhZ&_nc_ht=scontent-gmp1-1.xx&oh=00_AT9LHQO7sluY6Fhb9V4dB0PpXAHE7H92Ph29SrprZKEcbw&oe=62F7DB40",
      date: "2022-7-16 2:00",
      layout: 1,
      img: "https://cphoto.asiae.co.kr/listimglink/6/2018102613530980376_1540529587.jpg",
      loc: "독립문",
      story:
        "제가 독립문에 있을때는 말이죠 정말 붕어빵이 먹고싶었습니다. 그렇게 붕어빵을 먹는데 크림을 흘리는 사람이 옆에 있었어서 휴지를 품속에 들고 다녔죠. 휴지하니까 생각이 나는게 있는데 휴지는 늘 가지고 다녀야 합니다. 코피도 나고 화장실에 휴지가 없을 때도 있죠. 화장실 하니까 생각나는게 제가 대학교 1학년이었을때의 일입니다. 대학교 1학년이라고 하니까 생각나는 이야기가 있는데...",
    },
    {
      writer: "Daeun",
      writerPic:
        "https://t1.daumcdn.net/cfile/tistory/990975445B3AD34237",
      date: "2022-7-16 2:00",
      layout: 2,
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEwMTVfMjIg%2FMDAxNjM0Mjg5MzAzMDAz.FaH8UpwALhwLrhONcknSYNXNzPHu6QW9C1OWa14W7zMg.w9eLZfuR0sNxjqB7jXrsJ3z4ajBevTjQ9ASTWU4r0Iog.JPEG.tycoon60%2F20211009_175623.jpg&type=sc960_832",
      loc: "어청도",
      story:
        "제가 어청도에 있을때는 말이죠 하늘이 무척 맑았습니다. 산과 바다를 모두 즐길 수 있는 아름다운 곳이었죠. 산 하니까 생각이 나는게 있는데 산에 작고 형형색색의 귀여운 새들이 아주 많습니다. 새 하니까 생각이 나는게 있는데 남동생이 새똥에 맞았다고 인증샷 보낸 게 생각나네요. 새똥 하니까 생각이 나는게...",
    },
  ]);

  return (
    <>
      {post.map((card, idx) => {
        return <Feed key={"Feed" + idx} card={card} />;
      })}

      <ScrollTopBtn />
    </>
  );
};

export default FeedBox;
