import React from "react";

import Feed from "./Feed";
import ScrollTopBtn from "./ScrollTopBtn";

const FeedBox = () => {
  let post = [
    {
      date: "2022-2-7 16:00",
      img: "https://www.discoverlosangeles.com/sites/default/files/media/Activities/dodger-stadium-sunset-1.jpg?width=2600&fit=bound&quality=72&auto=webp",
      loc: "LA 다저 스타디움",
      story:
        "제가 LA에 있을때는 말이죠 정말 제가 꿈에 무대인 메이저리그로 진출해서 가는 식당마다 싸인해달라 기자들은 항상 붙어다니며 취재하고 제가 그 머~ 어~ 대통령이 된 기분이였어요 그런데 17일만에 17일만에 마이너리그로 떨어졌어요 못던져서 그만두고 그냥 확 한국으로 가버리고 싶었어요 그래서 집에 가는길에 그 맥주6개 달린거 있잖아요 맥주6개 그걸 사가지고 집으로 갔어요 그전에는 술먹으면 야구 못하는줄 알았어요 그냥 한국으로 가버릴려구.... 그리고 맥주 6개먹고 확 죽어버릴려고 그랬어요 야구 못하게 되니깐 그러나 집에가서 일단은 부모님에게 전화를 해야겠다고 생각을 했어요 다음날 가려고 전화를 딱 했는데 어머니께서 찬호야 어후~ 찬호야 아들 잘있어 밥은 먹고 다니는겨~ 잘지내는겨 대뜸 그러시는 거에요 내가 말도 하기도 전해 그래서 저는 야구좀 안되지만 잘하고 있다고 여기사람들 잘챙겨준다고 라고 거짓말을  했어요 한국은 못가게 됬지 내일 야구장은 가야하지 막막하더라구요 그럼 어떻게 가야하나 생각을 했어요....(후략)",
    },
    {
      date: "2022-7-16 2:00",
      img: "https://cphoto.asiae.co.kr/listimglink/6/2018102613530980376_1540529587.jpg",
      loc: "독립문",
      story:
        "제가 독립문에 있을때는 말이죠 정말 붕어빵이 먹고싶었습니다. 그렇게 붕어빵을 먹는데 크림을 흘리는 사람이 옆에 있었어서 휴지를 품속에 들고 다녔죠. 휴지하니까 생각이 나는게 있는데 휴지는 늘 가지고 다녀야 합니다. 코피도 나고 화장실에 휴지가 없을 때도 있죠. 화장실 하니까 생각나는게 제가 대학교 1학년이었을때의 일입니다. 대학교 1학년이라고 하니까 생각나는 이야기가 있는데...",
    },
  ];
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
